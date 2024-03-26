import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {
  capitals: CountryResponse[] = [];

  constructor(private readonly countriesService: CountriesService) {}

  searchByCapital(seachTerm: string) {
    this.countriesService.searchCapital(seachTerm).subscribe((data) => {
      this.capitals = data;
    });
  }
}
