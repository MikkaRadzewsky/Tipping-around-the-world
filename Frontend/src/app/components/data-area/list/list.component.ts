import { Component } from '@angular/core';
import { ContinentModel } from 'src/app/models/continent-model';
import { CountryModel } from 'src/app/models/country-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  public continents: ContinentModel[] = [];
  public countries: CountryModel[] = [];

  public constructor(private dataService: DataService) {}

  public async ngOnInit() {
    try {
      this.continents = await this.dataService.getContinents();
      this.countries = (await this.dataService.getCountries()).sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        return 1;
      });
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async displayCountries(args: Event) {
    try {
      const selectElement = args.target as HTMLSelectElement;
      const continentId = selectElement.value;

      this.countries = (
        await this.dataService.getCountriesByContinent(continentId)
      ).sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        return 1;
      });
    } catch (err: any) {
      alert(err.message);
    }
  }

  //   public async deleteMe(_id: string) {
  //     try {
  //       if (!window.confirm('Are you sure?')) return;

  //       await this.dataService.deleteCountry(_id);
  //       alert('Country has been deleted');

  //       //Refresh list:
  //       const index = this.countries.findIndex((e) => e._id === _id);
  //       this.countries.splice(index, 1);
  //     } catch (err: any) {
  //       alert(err.message);
  //     }
  //   }
}
