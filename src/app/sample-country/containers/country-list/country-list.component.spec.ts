/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CountryListComponent} from './country-list.component';
import {RouterModule} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import {CountryService} from '../../services/country.service';
import {Country} from '../../models/country.interface';
import {of} from 'rxjs';

describe('CountryListComponent', () => {
    let component: CountryListComponent;
    let fixture: ComponentFixture<CountryListComponent>;

    beforeEach(async () => {
        const countryService = jasmine.createSpyObj('CountryService', ['getCountries', 'deleteCountry']);
        countryService.getCountries.and.returnValue(of());
        countryService.deleteCountry.and.returnValue(of());
        TestBed.configureTestingModule({
            declarations: [CountryListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [RouterTestingModule, RouterModule],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: CountryService, useValue: countryService}
            ]
        });
        await TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CountryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });

    it('should delete the country', () => {
        component.delete({id: 1, name: 'Switzerland'} as Country);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        void expect(component['countryService'].deleteCountry).toHaveBeenCalledTimes(1);
    });
});
