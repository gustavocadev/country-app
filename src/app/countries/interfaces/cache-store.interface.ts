import { CountryResponse } from './country.interface';
import { Region } from './region.type';

export interface CacheStore {
  byCapital: TermCountry;
  byCountry: TermCountry;
  byRegion: RegionCountry;
}

export interface TermCountry {
  term: string;
  countries: CountryResponse[];
}

export type RegionCountry = {
  region: Region;
  countries: CountryResponse[];
};
