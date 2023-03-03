import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContinentModel } from 'src/app/models/continent-model';
import { CountryModel } from 'src/app/models/country-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  public country = new CountryModel();
  public continents: ContinentModel[] = [];

  public constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  public async ngOnInit() {
    try {
      this.continents = await this.dataService.getContinents();
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async send() {
    try {
      await this.dataService.addCountry(this.country);
      alert('Country has been successfully added');
      this.router.navigateByUrl('/list');
    } catch (err: any) {
      alert(err.message);
    }
  }
}
