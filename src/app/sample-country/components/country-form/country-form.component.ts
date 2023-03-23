import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Country} from '../../models/country.interface';
import {ValidationError} from '../../../error/models/validation-error.interface';

@Component({
	selector: 'spotlight-test-sample-country-form',
	templateUrl: 'country-form.component.html'
})
export class CountryFormComponent {
	@Input()
	country: Country;

	@Input()
	errors: ValidationError[];

	@Output()
	save: EventEmitter<Country> = new EventEmitter<Country>();

	handleSubmit(value: Country): void {
		this.save.emit(value);
	}
}
