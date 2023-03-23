/* eslint-disable @typescript-eslint/no-explicit-any */
import {TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, Pipe, PipeTransform} from '@angular/core';
import {APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterModule} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {Observable, of} from 'rxjs';

class FakeTranslateLoader implements TranslateLoader {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
    getTranslation(lang: string): Observable<any> {
        return of({});
    }
}

describe('AppComponent', () => {
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                RouterTestingModule,
                RouterModule,
                TranslateModule.forRoot({loader: {provide: TranslateLoader, useClass: FakeTranslateLoader}}),
                ToastrModule.forRoot()
            ],
            providers: [
                Location,
                {provide: LocationStrategy, useClass: PathLocationStrategy},
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: ToastrService}
            ]
        });
        await TestBed.compileComponents();
    });

    it('should create the app', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = await fixture.debugElement.componentInstance as AppComponent;
        void expect(app).toBeTruthy();
    });
});

/**
 * Global mock for the TranslateService
 */
export const translateServiceMock = (): TranslateService => jasmine.createSpyObj<TranslateService>('TranslateService', {
    instant: 'translated',
    get: of('translated')
});

/**
 * Global mock for the TranslatePipe
 */
@Pipe({
    name: 'translate'
})
export class TranslatePipeMock implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public transform(query: string, ...args: any[]): any {
        return query;
    }
}

/**
 * Global mock for the Router
 */
export const routerMock = (): Router => jasmine.createSpyObj<Router>('Router', {
    navigate: undefined
});
