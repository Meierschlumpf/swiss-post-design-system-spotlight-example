/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {BrowserModule} from '@angular/platform-browser';
import {
	CommonModule,
	Location,
	LocationStrategy,
	PathLocationStrategy,
	registerLocaleData
} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SecurityModule} from './security/security.module';
import {SampleCountryModule} from './sample-country/sample-country.module';
import {SampleAuthorizationModule} from './sample-authorization/sample-authorization.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import localeDeCH from '@angular/common/locales/de-CH';
import localeItCH from '@angular/common/locales/it-CH';
import localeFrCH from '@angular/common/locales/fr-CH';
import localeEnGB from '@angular/common/locales/en-GB';
import {AcceptLanguageInterceptor} from './common/accept-language-interceptor';
import {AppRoutingModule} from './app.routing.module';
import {
	SwissPostDatepickerI18n,
	SwissPostDateParserFormatter
} from './common/datepicker-configuration';
import {
	NgbModule,
	NgbDatepickerI18n,
	NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpErrorInterceptor} from './security/http-error-interceptor';
import {GlobalErrorHandler} from './error/services/global-error-handler.service';
import {SwissPostIntranetHeaderModule} from '@swisspost/design-system-intranet-header';

import {WebpackTranslateLoader} from './common/webpack-translate-loader';
import {TraceParentInterceptor} from '@ch-post-common/common-tracing';
import {SpotlightModule} from './spotlight/spotlight.module';

registerLocaleData(localeDeCH, 'de');
registerLocaleData(localeItCH, 'it');
registerLocaleData(localeFrCH, 'fr');
registerLocaleData(localeEnGB, 'en');

@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		NgbModule,
		ToastrModule.forRoot({
			toastClass: 'toast',
			timeOut: 0,
			extendedTimeOut: 0,
			closeButton: false,
			preventDuplicates: true
		}),
		BrowserAnimationsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: WebpackTranslateLoader
			}
		}),
		SwissPostIntranetHeaderModule,
		SpotlightModule,
		SampleCountryModule,
		SampleAuthorizationModule,
		SecurityModule,
		AppRoutingModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [
		Location,
		{provide: LocationStrategy, useClass: PathLocationStrategy},
		{provide: NgbDatepickerI18n, useClass: SwissPostDatepickerI18n},
		{
			provide: NgbDateParserFormatter,
			useClass: SwissPostDateParserFormatter
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AcceptLanguageInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TraceParentInterceptor,
			multi: true
		},
		{provide: ErrorHandler, useClass: GlobalErrorHandler}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
