import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  countries: CountryResponse[] = [];
  initialTerm = '';

  constructor(private readonly countriesService: CountriesService) {}

  ngOnInit(): void {
    if (this.countriesService.cachedStore.byCountry.countries) {
      this.countries = this.countriesService.cachedStore.byCountry.countries;
      this.initialTerm = this.countriesService.cachedStore.byCountry.term;
    }
  }

  searchByCountry(seachTerm: string) {
    this.countriesService.searchCountry(seachTerm).subscribe((data) => {
      // this.countriesService.cachedStore.byCountry.countries = data;
      this.countries = data;
    });
  }
}
