import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {


  public static prepareCityNames(cities: any, minPop: number, header: string): string[] {

    const citiesFiltered = cities.filter((entry) => entry.population >= minPop);

    let cityString = '';
    for (const city of citiesFiltered) {
      cityString = (cityString === '') ? city.name : `${cityString},${city.name}`;
    }

    return [header].concat(cityString.split(','));
  }

  constructor() { }


}
