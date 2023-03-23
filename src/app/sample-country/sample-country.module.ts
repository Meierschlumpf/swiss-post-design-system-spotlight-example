import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorModule} from '../error/error.module';
import {CountryListComponent} from './containers/country-list/country-list.component';
import {CountryDetailComponent} from './containers/country-detail/country-detail.component';
import {CountryFormComponent} from './components/country-form/country-form.component';
import {CountryService} from './services/country.service';
import {AuthGuard} from '../security/auth-guard';

const routes: Routes = [
    {
        path: 'ui', children: [
            {
                path: 'countries', canActivate: [AuthGuard], data: {roles: ['ROLE_ADMIN', 'ROLE_GUEST']},
                children: [
                    {path: '', component: CountryListComponent},
                    {path: ':id', component: CountryDetailComponent}
                ]
            }
        ]
    }
];

@NgModule({
    declarations: [
        CountryListComponent,
        CountryDetailComponent,
        CountryFormComponent
    ],
    imports: [
        FormsModule,
        ErrorModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild()
    ],
    providers: [
        CountryService
    ]
})
export class SampleCountryModule {}
