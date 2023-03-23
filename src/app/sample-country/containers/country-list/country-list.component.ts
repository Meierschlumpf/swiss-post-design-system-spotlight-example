import {Component, OnInit} from '@angular/core';
import {Country} from '../../models/country.interface';
import {CountryService} from '../../services/country.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Problem} from '../../../error/models/problem.interface';

@Component({
    selector: 'spotlight-test-sample-country-list',
    templateUrl: 'country-list.component.html'
})
export class CountryListComponent implements OnInit {

    countries: Country[] = [];

    constructor(private countryService: CountryService) {}

    ngOnInit(): void {
        this.getCountries();
    }

    private getCountries(): void {
        this.countryService.getCountries().subscribe((data: Country[]) => {
            this.countries = data;
        });
    }

    delete(country: Country): void {
        this.countryService.deleteCountry(country.id).subscribe(
            () => {
                console.log('Deleted country', country);
                this.ngOnInit();
            }, (response: HttpErrorResponse) => console.log((response.error as Problem).validationErrors)
        );
    }

    triggerServerError(): void {
        this.countryService.triggerServerError().subscribe(
            () => console.log('Success: we do not pass here because the server failed.')
        );
    }

}
