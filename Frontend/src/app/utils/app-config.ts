class AppConfig {
  public continentsUrl = 'http://localhost:3001/api/continents';
  public countriesUrl = 'http://localhost:3001/api/countries/';
  public countriesByContinentsUrl =
    'http://localhost:3001/api/countries-by-continent/';
}

export const appConfig = new AppConfig();
