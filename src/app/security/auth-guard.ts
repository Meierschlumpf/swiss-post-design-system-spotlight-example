import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const neededRoles = route.data['roles'] as Array<string>;
        return this.userService.canActivate(neededRoles);
    }

}
