/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access */
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {SpotlightService} from './spotlight/services/spotlight.service';
import {SpotlightAction} from './spotlight/models/spotlight-action';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const environment: any;

@Component({
	selector: 'spotlight-test-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
	openedMenu = false;

	constructor(
		@Inject(LOCALE_ID) public language: string,
		private translateService: TranslateService,
		private modalService: NgbModal,
		private router: Router,
		private spotlightService: SpotlightService
	) {}

	public ngOnInit(): void {
		this.router.events.subscribe(() => {
			this.openedMenu = false;
		});

		this.translateService.use(this.language);
	}

	get spotlightActions(): SpotlightAction[] {
		return [
			{
				title: 'Accordion',
				description: 'Example',
				path: '/ui/accordion'
			},
			{
				title: 'Button',
				description: 'Example',
				path: '/ui/home'
			}
		];
	}

	async handleTrigger(action: SpotlightAction) {
		await this.router.navigateByUrl(action.path);
	}

	public openSpotlight(): void {
		this.spotlightService.open();
	}

	public toggleMenu(): void {
		this.openedMenu = !this.openedMenu;
	}
}
