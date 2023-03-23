import {Component, OnInit} from '@angular/core';
import {Country} from '../../models/country.interface';
import {CountryService} from '../../services/country.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ValidationError} from '../../../error/models/validation-error.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {isNumeric} from 'rxjs/internal-compatibility';
import {HttpErrorInterceptor} from '../../../security/http-error-interceptor';
import {Problem} from '../../../error/models/problem.interface';

@Component({
    selector: 'spotlight-test-sample-country-detail',
    templateUrl: 'country-detail.component.html'
})
export class CountryDetailComponent implements OnInit {

    country: Country;
    errors: ValidationError[];

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private countryService: CountryService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            const id = params['id'] as string;
            if (isNumeric(id)) {
                this.countryService.getCountry(+id).subscribe((data: Country) => {
                    console.log('Received', data);
                    this.country = data;
                });
            }
        });
    }

    handleSave(submittedCountry: Country): void {
        if (this.country && this.country.id) {
            submittedCountry.id = this.country.id;
            this.countryService.updateCountry(submittedCountry).subscribe(
                (data) => {
                    console.log('Updated country', data);
                    void this.router.navigate(['/ui/countries']);
                }, (response: HttpErrorResponse) => this.errors = HttpErrorInterceptor.isResponseAProblem(response.error) ? (response.error as Problem).validationErrors : undefined
            );
        } else {
            this.countryService.createCountry(submittedCountry).subscribe(
                (data) => {
                    console.log('Created country', data);
                    void this.router.navigate(['/ui/countries']);
                }, (response: HttpErrorResponse) => this.errors = HttpErrorInterceptor.isResponseAProblem(response.error) ? (response.error as Problem).validationErrors : undefined
            );
        }
    }

}
