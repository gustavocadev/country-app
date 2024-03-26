import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent {
  countries: CountryResponse[] = [];

  constructor(private readonly countriesService: CountriesService) {}
  searchByCountry(seachTerm: string) {
    this.countriesService.searchCountry(seachTerm).subscribe((data) => {
      this.countries = data;
    });
  }
}
