import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output
} from '@angular/core';
import {
	SpotlightAction,
	SpotlightTriggerHandler
} from '../../models/spotlight-action';
import {SpotlightService} from '../../services/spotlight.service';

@Component({
	selector: 'spotlight-provider',
	templateUrl: 'spotlight-provider.component.html'
})
export class SpotlightProviderComponent implements OnInit, OnDestroy {
	@Input() actions: SpotlightAction[];
	@Output() triggered = new EventEmitter<SpotlightAction>();

	constructor(private spotlightService: SpotlightService) {}
	ngOnInit(): void {
		this.spotlightService.registerActions(this.actions);

		this.spotlightService.triggered.subscribe((action) => {
			this.triggered.emit(action);
		});

		document.addEventListener('keydown', (event: KeyboardEvent) => {
			if (!['KeyP', 'KeyK'].includes(event.code)) return;
			if (!event.ctrlKey) return;

			event.preventDefault();
			this.spotlightService.toggle();
		});
	}
	ngOnDestroy(): void {
		document.removeEventListener('keydown', (event: KeyboardEvent) => {
			if (!['KeyP', 'KeyK'].includes(event.code)) return;
			if (!event.ctrlKey) return;

			this.spotlightService.toggle();
		});
	}
}
