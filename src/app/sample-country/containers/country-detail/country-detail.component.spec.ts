/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CountryDetailComponent} from './country-detail.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {of, Subject} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {CountryService} from '../../services/country.service';
import {Country} from '../../models/country.interface';
import {routerMock} from '../../../app.component.spec';

describe('CountryDetailComponent', () => {
    let component: CountryDetailComponent;
    let fixture: ComponentFixture<CountryDetailComponent>;
    let routeParams: Subject<Params>;
    const expectedCountry: Country = {
        id: 1, name: 'Switzerland'
    };

    beforeEach(async () => {
        routeParams = new Subject<Params>();
        const countryService = jasmine.createSpyObj('CountryService', ['getCountry', 'createCountry', 'updateCountry']);
        countryService.createCountry.and.returnValue(of(expectedCountry));
        countryService.getCountry.and.returnValue(of(expectedCountry));
        countryService.updateCountry.and.returnValue(of());
        TestBed.configureTestingModule({
            declarations: [CountryDetailComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [RouterTestingModule, RouterModule],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: ActivatedRoute, useValue: {params: routeParams}},
                {provide: CountryService, useValue: countryService},
                {provide: Router, useValue: routerMock()}
            ]
        });
        await TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CountryDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });

    it('should check if the country is loaded from giving router param id', () => {
        routeParams.next({id: 1});
        void expect(component['country'].name).toEqual(expectedCountry.name);
    });

    it('should create a new country', () => {
        routeParams.next({id: 'new'});
        component.handleSave({id: null, name: 'Swaziland'} as Country);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        void expect(component['countryService'].createCountry).toHaveBeenCalledTimes(1);
    });

    it('should update the country', () => {
        routeParams.next({id: 1});
        component.handleSave({id: null, name: 'Italy'} as Country);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        void expect(component['countryService'].updateCountry).toHaveBeenCalledTimes(1);
    });
});
