import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserService} from './user.service';
import {Problem} from '../error/models/problem.interface';
import {GlobalErrorHandler} from '../error/services/global-error-handler.service';

/**
 * Handle http errors globally.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private translateService: TranslateService,
                private toastr: ToastrService,
                private userService: UserService,
                private globalErrorHandler: GlobalErrorHandler) {
    }

    public static isResponseAProblem(obj: unknown): boolean {
        const problem: Problem = obj as Problem;
        return problem && !!problem.title && problem.status && !!problem.detail;
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((response: HttpErrorResponse) => {
                if (response.status === 400 && HttpErrorInterceptor.isResponseAProblem(response.error)) {
                    // By convention this is an expected error, so we let the caller handle it.
                    return throwError(response);
                } else if (response.status === 401 || response.status === 403) {
                    // Unauthorized/Forbidden: we show the user the login form.
                    this.userService.redirectToLogin(response.status, response.statusText);
                    return of({}) as Observable<HttpEvent<unknown>>;
                } else {
                    // Let the GlobalErrorHandler handle the unexpected errors.
                    this.globalErrorHandler.handleError(response);
                    return of({}) as Observable<HttpEvent<unknown>>;
                }
            })
        );
    }

}
