import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CountryResponse } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  #apiUrl = new URL('https://restcountries.com/v3.1');
  cachedStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private readonly httClient: HttpClient) {
    this.#loadFromLocalStore();
  }

  #saveToLocalStore() {
    localStorage.setItem('cached-store', JSON.stringify(this.cachedStore));
  }

  #loadFromLocalStore() {
    const data = localStorage.getItem('cached-store');
    if (data) {
      this.cachedStore = JSON.parse(data);
    }
  }

  #getCountriesRequest(url: string): Observable<CountryResponse[]> {
    return this.httClient.get<CountryResponse[]>(url).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return of([]);
      }),
      delay(400)
    );
  }

  searchCountryByAlphaCode(code: string): Observable<CountryResponse | null> {
    return this.httClient
      .get<CountryResponse[]>(`${this.#apiUrl.href}/alpha/${code}`)
      .pipe(
        map((countries) => (countries.length > 0 ? countries.at(0)! : null)),
        catchError((error) => of(null))
      );
  }

  searchCapital(searchTerm: string): Observable<CountryResponse[]> {
    const url = `${this.#apiUrl.href}/capital/${searchTerm}`;

    return this.#getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cachedStore.byCapital = {
            term: searchTerm,
            countries,
          })
      ),
      tap(() => this.#saveToLocalStore())
    );
  }

  searchCountry(searchTerm: string): Observable<CountryResponse[]> {
    const url = `${this.#apiUrl.href}/name/${searchTerm}`;

    return this.#getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cachedStore.byCountry = {
            term: searchTerm,
            countries,
          })
      ),
      tap(() => this.#saveToLocalStore())
    );
  }

  searchRegion(searchTerm: Region): Observable<CountryResponse[]> {
    const url = `${this.#apiUrl.href}/region/${searchTerm}`;

    return this.#getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cachedStore.byRegion = {
            region: searchTerm,
            countries,
          })
      ),
      tap(() => this.#saveToLocalStore())
    );
  }
}
