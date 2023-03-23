import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {
	SpotlightAction,
	SpotlightTriggerHandler
} from '../../models/spotlight-action';

@Component({
	templateUrl: 'spotlight.component.html',
	styleUrls: ['spotlight.component.css']
})
export class SpotlightComponent {
	private _actions: SpotlightAction[];
	private _search = '';
	@Input() set actions(value: SpotlightAction[]) {
		this._actions = value;
		this.filter(this._search);
	}

	get actions(): SpotlightAction[] {
		return this._actions;
	}

	@Input() handleTrigger: SpotlightTriggerHandler;

	filteredActions: SpotlightAction[] = this.actions;

	private activeIndex: number = undefined;

	constructor(public activeModal: NgbActiveModal, private router: Router) {}

	public isActive(index: number) {
		return this.activeIndex == index;
	}

	private handleArrowDown() {
		this.activeIndex++;
		if (this.activeIndex < this.actions.length) return;
		this.activeIndex = 0;
	}

	private handleArrowUp() {
		this.activeIndex--;
		if (this.activeIndex >= 0) return;
		this.activeIndex = this.actions.length - 1;
	}

	public trigger(index: number) {
		const activeAction = this.actions[index];

		this.handleTrigger(activeAction);
		this.activeModal.close();
	}

	public handleFilter(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const search = input.value.trim().toLowerCase();
		this._search = search;
		this.filter(search);
	}

	public filter(search: string) {
		this.filteredActions = this._actions.filter(
			(action) =>
				action.title.toLowerCase().includes(search) ||
				action.description.toLowerCase().includes(search)
		);
	}

	private handleEnter() {
		if (this.activeIndex === undefined) return;

		this.trigger(this.activeIndex);
	}

	public handleKey(ev: KeyboardEvent) {
		switch (ev.code) {
			case 'ArrowDown': {
				this.handleArrowDown();
				break;
			}
			case 'ArrowUp': {
				this.handleArrowUp();
				break;
			}
			case 'Enter': {
				this.handleEnter();
				break;
			}
		}
	}
}
