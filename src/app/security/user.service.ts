import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {User} from './user.interface';
import {environment} from 'src/environments/environment';

@Injectable()
export class UserService {

    private user: User;

    constructor(private http: HttpClient, private router: Router) {
    }

    getCurrentUserFromServer(): Observable<User> {
        console.log('Loading user from server.');
        return this.http.get<User>(`${environment.backendPath}auth/users/current`);
    }

    login(username: string, password: string): void {
        console.log('Login call');

        // logout first
        this.logout();

        // login call
        const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        const body = new HttpParams()
            .set('username', username)
            .set('password', password);

        this.http
            .post(`${environment.backendPath}auth/login`, body, {headers, responseType: 'text'})
            .subscribe(() => void this.router.navigate(['/']));
    }

    logout(): void {
        this.http.post(`${environment.backendPath}auth/logout`, {}).subscribe();
        this.user = null;
    }

    isLoggedIn(): boolean {
        return !!this.user;
    }

    canActivate(neededRoles: Array<string>): Observable<boolean> {
        if (this.isLoggedIn()) {
            console.log('User is already logged in');
            return of(this.hasRoleOrRedirectToLogin(neededRoles));
        } else {
            console.log('We don\'t know if the user is logged in, we get him from the server');
            const canActivateSubject = new Subject<boolean>();
            this.getCurrentUserFromServer()
                .subscribe((user: User) => {
                    console.log('User loaded: ', user);
                    this.user = user;
                    canActivateSubject.next(this.hasRoleOrRedirectToLogin(neededRoles));
                    canActivateSubject.complete();
                });
            return canActivateSubject;
        }
    }

    redirectToLogin(status: number, statusText: string): void {
        const queryParams = {};

        if (status) {
            queryParams['status'] = status;
        }
        if (statusText) {
            queryParams['statusText'] = statusText;
        }

        void this.router.navigate(['/ui/login'], {
            queryParams,
            queryParamsHandling: 'merge'
        });
    }

    private hasRoleOrRedirectToLogin(neededRoles: string[]): boolean {
        if (this.hasNeededRoles(neededRoles)) {
            return true;
        } else {
            console.log('User is missing one of needed roles', neededRoles);
            this.redirectToLogin(null, null);
            return false;
        }
    }

    private hasNeededRoles(neededRoles: Array<string>): boolean {
        let hasOneOfNeededRoles = false;
        this.user.roles.forEach(role => {
            if (neededRoles.indexOf(role) > -1) {
                hasOneOfNeededRoles = true;
            }
        });
        return hasOneOfNeededRoles;
    }

}
