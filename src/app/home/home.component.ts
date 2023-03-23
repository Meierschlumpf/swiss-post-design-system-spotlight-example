import {Component} from '@angular/core';
import {SpotlightService} from '../spotlight/services/spotlight.service';

@Component({
	selector: 'spotlight-test-home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.scss']
})
export class HomeComponent {
	constructor(private spotlightService: SpotlightService) {}

	handleAddition() {
		this.spotlightService.registerActions([
			{
				id: 'secret',
				title: 'Secret Action',
				description: 'This is a secret action!',
				path: '/ui/secret'
			}
		]);
	}
}
