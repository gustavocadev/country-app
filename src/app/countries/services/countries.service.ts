import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CountryResponse } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  #apiUrl = new URL('https://restcountries.com/v3.1');
  constructor(private readonly httClient: HttpClient) {}

  searchCapital(searchTerm: string): Observable<CountryResponse[]> {
    const resp = this.httClient
      .get<CountryResponse[]>(`${this.#apiUrl.href}/capital/${searchTerm}`)
      .pipe(catchError((error) => of([])));

    return resp;
  }

  searchCountry(searchTerm: string): Observable<CountryResponse[]> {
    const resp = this.httClient
      .get<CountryResponse[]>(`${this.#apiUrl.href}/name/${searchTerm}`)
      .pipe(catchError((error) => of([])));

    return resp;
  }

  searchRegion(searchTerm: string): Observable<CountryResponse[]> {
    const resp = this.httClient
      .get<CountryResponse[]>(`${this.#apiUrl.href}/region/${searchTerm}`)
      .pipe(catchError((error) => of([])));

    return resp;
  }
}
