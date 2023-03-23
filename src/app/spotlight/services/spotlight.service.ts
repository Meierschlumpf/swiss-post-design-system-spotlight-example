import {Injectable} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {SpotlightComponent} from '../components/spotlight/spotlight.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {SpotlightAction} from '../models/spotlight-action';
import {skip} from 'rxjs/operators';

@Injectable()
export class SpotlightService {
	private _actions: BehaviorSubject<SpotlightAction[]> = new BehaviorSubject<
		SpotlightAction[]
	>([]);
	public actions: Observable<SpotlightAction[]> =
		this._actions.asObservable();

	public opened = false;

	private _closed: BehaviorSubject<void> = new BehaviorSubject<void>(
		undefined
	);
	public closed = this._closed.asObservable().pipe(skip(1));

	private _dismissed: BehaviorSubject<void> = new BehaviorSubject<void>(
		undefined
	);
	public dismissed = this._dismissed.asObservable().pipe(skip(1));

	private _triggered: BehaviorSubject<SpotlightAction | null> =
		new BehaviorSubject<SpotlightAction | null>(null);
	public triggered = this._triggered.asObservable().pipe(skip(1));

	private activeSpotlightRef: NgbModalRef;

	constructor(private modalService: NgbModal) {}

	private resetSpotlightRef() {
		this.activeSpotlightRef = null;
		this.opened = false;
	}

	open() {
		if (this.activeSpotlightRef) return;

		this.activeSpotlightRef = this.modalService.open(SpotlightComponent, {
			size: 'lg'
		});
		this.opened = true;
		this.activeSpotlightRef.closed.subscribe(() => {
			this.resetSpotlightRef();
			this._closed.next(undefined);
		});
		this.activeSpotlightRef.dismissed.subscribe(() => {
			this.resetSpotlightRef();
			this._dismissed.next(undefined);
		});

		const component = this.activeSpotlightRef
			.componentInstance as SpotlightComponent;
		component.handleTrigger = (action) => this._triggered.next(action);
		this.actions.subscribe((actions) => (component.actions = actions));
	}

	close() {
		if (!this.activeSpotlightRef) return;

		this.activeSpotlightRef.close();
		this.resetSpotlightRef();
	}

	toggle() {
		if (this.activeSpotlightRef) return this.close();
		this.open();
	}

	registerActions(actions: SpotlightAction[]) {
		this._actions.next([...this._actions.getValue(), ...actions]);
	}

	removeActions(actionIds: string[]) {
		this._actions.next([
			...this._actions
				.getValue()
				.filter((action) => !actionIds.includes(action.id))
		]);
	}
}
