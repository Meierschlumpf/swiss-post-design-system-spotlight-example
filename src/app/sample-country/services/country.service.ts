import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Country} from '../models/country.interface';
import {Observable} from 'rxjs';

const COUNTRY_API = `${environment.backendPath}api/sample/countries`;

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) {}

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(COUNTRY_API);
    }

    getCountry(id: number): Observable<Country> {
        return this.http.get<Country>(`${COUNTRY_API}/${id}`);
    }

    createCountry(country: Country): Observable<Country> {
        return this.http.post<Country>(`${COUNTRY_API}`, country);
    }

    updateCountry(country: Country): Observable<Country> {
        return this.http.put<Country>(`${COUNTRY_API}/${country.id}`, country);
    }

    deleteCountry(id: number): Observable<number> {
        return this.http.delete<number>(`${COUNTRY_API}/${id}`);
    }

    triggerServerError(): Observable<unknown> {
        return this.http.get(`${COUNTRY_API}/error`);
    }

}
