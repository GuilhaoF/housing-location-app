import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: `./home.component.html`,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: Housinglocation[] = []; // aqui esta definindo a variavel que vai receber a lista de imoveis filtrada

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: Housinglocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    })
  }
  filteredResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList; // aqui esta verificando se o texto esta vazio e se estiver ele retorna a lista de imoveis
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    ); // aqui esta filtrando a lista de imoveis
  }
}
