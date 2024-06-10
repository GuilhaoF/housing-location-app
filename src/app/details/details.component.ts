import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute) // aqui esta injetando a rota que foi acessada para pegar o id
  housingService = inject(HousingService) // aqui esta injetando o serviço de housing para pegar os detalhes do imovel
  housingLocation: Housinglocation | undefined // aqui esta definindo a variavel que vai receber os detalhes do imovel e typeando ela como Housinglocation

  applyForm = new FormGroup({ // aqui esta definindo o formulario de aplicação para o imovel
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    filhos: new FormControl(0),
  });
  constructor(private titlePage: Title) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10)// aqui esta pegando o id do imovel que foi acessado e o numero 10 é a base da conversão
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation
      this.titlePage.setTitle(this.housingLocation!.name) // aqui esta definindo o titulo da pagina
    }) // aqui esta pegando os detalhes do imovel que foi acessado

  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '', // aqui esta pegando os valores do formulario e passando para a função de submissão
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.filhos ?? 0
    )
  }// aqui esta definindo a função de submissão do formulario
}
