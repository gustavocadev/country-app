import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent {
  countries: CountryResponse[] = [];
  constructor(private readonly countriesService: CountriesService) {}

  searchByRegion(searchTerm: string) {
    this.countriesService.searchRegion(searchTerm).subscribe((data) => {
      this.countries = data;
    });
  }
}
