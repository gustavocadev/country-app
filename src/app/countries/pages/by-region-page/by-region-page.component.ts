import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnInit {
  countries: CountryResponse[] = [];

  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?: Region;

  constructor(private readonly countriesService: CountriesService) {}

  ngOnInit(): void {
    const { countries, region } = this.countriesService.cachedStore.byRegion;
    if (countries && region) {
      this.countries = this.countriesService.cachedStore.byRegion.countries;
      this.selectedRegion = this.countriesService.cachedStore.byRegion.region;
    }
  }

  searchByRegion(searchTerm: Region) {
    this.selectedRegion = searchTerm;

    this.countriesService.searchRegion(searchTerm).subscribe((data) => {
      // this.countriesService.cachedStore.byRegion.countries = data;
      this.countries = data;
    });
  }
}
