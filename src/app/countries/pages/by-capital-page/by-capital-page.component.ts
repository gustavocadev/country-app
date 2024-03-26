import { Component, OnInit, signal } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent implements OnInit {
  capitals: CountryResponse[] = [];
  isLoading = signal(false);
  initialTerm = '';

  constructor(private readonly countriesService: CountriesService) {}

  ngOnInit(): void {
    if (this.countriesService.cachedStore.byCapital.countries) {
      this.capitals = this.countriesService.cachedStore.byCapital.countries;
      this.initialTerm = this.countriesService.cachedStore.byCapital.term;
    }
  }

  searchByCapital(seachTerm: string) {
    // for spinner
    this.isLoading.set(true);

    // for caching
    // this.countriesService.cachedStore.byCapital.term = seachTerm;

    this.countriesService.searchCapital(seachTerm).subscribe((data) => {
      this.capitals = data;
      this.isLoading.set(false);
    });
  }
}
