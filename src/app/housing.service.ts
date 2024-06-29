import { Injectable } from '@angular/core';
import { Housinglocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = "http://localhost:3000/locations";
  // significa  que a propriedade é obrigatória
  constructor() { }
  async getAllHousingLocations(): Promise<Housinglocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? []
  }
  async getHousingLocationById(id: number): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.url}/${id}`, {
      cache: "no-cache"
    });
    return (await data.json()) ?? {};
  }
  submitApplication(firstName: string, lastName: string, email: string, filhos: number) {
    alert(JSON.stringify({ firstName, lastName, email, filhos }));
    
  }


}
