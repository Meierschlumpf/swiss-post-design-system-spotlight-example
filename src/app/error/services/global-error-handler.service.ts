import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpTracedErrorResponse} from '@ch-post-common/common-tracing';

/**
 * Handles unhandled errors globally.
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    private toastr: ToastrService;
    private translateService: TranslateService;

    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) : void {
        console.error('Unexpected error', error);
        if (!this.toastr) {
            this.toastr = this.injector.get(ToastrService);
        }
        if (!this.translateService) {
            this.translateService = this.injector.get(TranslateService);
        }
        if (error instanceof HttpTracedErrorResponse) {
            this.toastr.error(error.traceId, this.translateService.instant('template.error.generic') as string);
        } else {
            this.toastr.error(this.translateService.instant('template.error.generic') as string);
        }
    }

}
