import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

public static usersLatitude = 0;
public static usersLongitude = 0;
public static closestFancyCity = '';

  public static getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(GeoService.successHandler, GeoService.errorHandler, { enableHighAccuracy: true, timeout: 10000 });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  public static successHandler(position) {
    GeoService.usersLatitude = position.coords.latitude;
    GeoService.usersLongitude = position.coords.longitude;
  }

  public static errorHandler(error) {

    console.log(`Going forward without Geo Data due to error: ${error.message}`);
  }

  public constructor() { }
}
