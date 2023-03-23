import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './containers/login/login.component';
import {UserService} from './user.service';
import {AuthGuard} from './auth-guard';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {GlobalErrorHandler} from '../error/services/global-error-handler.service';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule.forChild()
    ],
    providers: [
        AuthGuard,
        UserService,
        GlobalErrorHandler
    ]
})
export class SecurityModule {}
