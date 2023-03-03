import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ContinentModel } from '../models/continent-model';
import { CountryModel } from '../models/country-model';
import { appConfig } from '../utils/app-config';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public constructor(private http: HttpClient) {}

  //Get all continents:
  public async getContinents(): Promise<ContinentModel[]> {
    const observable = this.http.get<ContinentModel[]>(appConfig.continentsUrl);
    const continents = await firstValueFrom(observable);
    return continents;
  }

  //Get all countries:
  public async getCountries(): Promise<CountryModel[]> {
    const observable = this.http.get<CountryModel[]>(appConfig.countriesUrl);
    const countries = await firstValueFrom(observable);
    return countries;
  }

  //Get countries by continent:
  public async getCountriesByContinent(
    continentId: string
  ): Promise<CountryModel[]> {
    if (continentId === "0") {
      const observable = this.http.get<CountryModel[]>(appConfig.countriesUrl);
      const countries = await firstValueFrom(observable);
      return countries;
    }
    const observable = this.http.get<CountryModel[]>(
      appConfig.countriesByContinentsUrl + continentId
    );
    const countries = await firstValueFrom(observable);
    return countries;
  }

  // Add country:
  public async addCountry(country: CountryModel): Promise<void> {
    const observable = this.http.post<CountryModel>(
      appConfig.countriesUrl,
      country
    );
    await firstValueFrom(observable);
  }

  // Delete country:
  public async deleteCountry(countryId: string): Promise<void> {
    const observable = this.http.delete(appConfig.countriesUrl + countryId);
    await firstValueFrom(observable);
  }
}
