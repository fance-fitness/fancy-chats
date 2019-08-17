import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEvent } from './types';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public constructor(private http: HttpClient) { }
  public static planBBackendURL = 'https://fance-stiftung.de/';

  // public static backendURL = 'https://dance-planner.com/';
  public static backendURL = 'http://localhost:3000/';

  public static frontendURL = 'https://dance-planner.de/';
  // public static frontendURL = 'http://localhost:4200/';


  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public getChat(chatId: string): any {
    const url = `${BackendService.backendURL}api/chats/getChat/chatId/${chatId}`;
    return this.http.get(url);
  }

  public getEvents(): any {
    return this.http.get(`${BackendService.backendURL}api/events/getEvents`);
  }

  public getFutureEvents(latitude?: number, longitude?: number): any {
      return this.http.get(`${BackendService.backendURL}api/events/getFutureEvents/latitude/${latitude}/longitude/${longitude}`);
  }

  public getEvent(eventId: string, version: string): any {
    return this.http.get(`${BackendService.backendURL}api/events/getEvent/eventId/${eventId}/version/${version}`);
  }

  public getCities(country: string, minPop: number): any {
      return this.http.get(`${BackendService.backendURL}api/cities/country/${country}/minPop/${minPop}`);
  }

  public addEvent(event: IEvent): any {
    return this.http.post<IEvent>(`${BackendService.backendURL}api/events/addEvent`, JSON.stringify(event), this.httpOptions);
  }

  public updateEvent(event: IEvent): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<IEvent>(`${BackendService.backendURL}api/events/updateEvent`, JSON.stringify(event), httpOptions);
  }


  public reportEvent(event: IEvent): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<IEvent>(`${BackendService.backendURL}api/events/reportEvent`, JSON.stringify(event), httpOptions);
  }


  public updateDates(event: IEvent, adminKey: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<IEvent>(`${BackendService.backendURL}api/admin/updateDates/adminKey/${adminKey}`, JSON.stringify(event), httpOptions);
  }

  public deleteEvent(eventId: string, version: string): any {
    return this.http.get(`${BackendService.backendURL}api/events/delete/eventId/${eventId}/version/${version}`);
  }

  public isItTheCorrectHash(adminHash: string): any {
    return this.http.get(`${BackendService.backendURL}api/admin/isItTheCorrectHash/adminHash/${adminHash}`);
  }

  public getReportedEvents(adminKey: string): any {
    return this.http.get(`${BackendService.backendURL}api/admin/getReportedEvents/adminKey/${adminKey}`);
  }

  public getEventsWithSecretIds(adminKey: string): any {
    return this.http.get(`${BackendService.backendURL}api/admin/getEventsWithSecrets/adminKey/${adminKey}`);
  }

  public triggerConsistencyCheck(adminKey: string): any {
    return this.http.get(`${BackendService.backendURL}api/admin/triggerConsistencyCheck/adminKey/${adminKey}`);
  }

  public triggerBackup(adminKey: string): any {
    return this.http.get(`${BackendService.backendURL}api/admin/triggerBackup/adminKey/${adminKey}`);
  }

  public fetchDataFromSystem(adminKey: string, system: string): any {
    alert('fetching data from backups');
    return this.http.get(`${BackendService.backendURL}api/admin/fetchDataFromSystem/adminKey/${adminKey}/system/${system}`);
  }

  public markAsReviewed(adminKey: string, eventId: string, eventVersion: string): any {
    return this.http.get(`${BackendService.backendURL}api/admin/markAsReviewed/adminKey/${adminKey}/eventId/${eventId}/eventVersion/${eventVersion}`);
  }

  public markAsReviewedByInsider(insiderKey: string, eventId: string, eventVersion: string): any {
    return this.http.get(`${BackendService.backendURL}api/insider/markAsReviewed/insiderKey/${insiderKey}/eventId/${eventId}/eventVersion/${eventVersion}`);
  }

  public deleteReport(event: IEvent, adminKey: string): any {
    return this.http.post<IEvent>(`${BackendService.backendURL}api/admin/deleteReport/adminKey/${adminKey}`, JSON.stringify(event), this.httpOptions);
  }

  public deleteReportByInsider(event: IEvent, insiderKey: string): any {
    return this.http.post<IEvent>(`${BackendService.backendURL}api/insider/deleteReport/insiderKey/${insiderKey}`, JSON.stringify(event), this.httpOptions);
  }

  public reloadConfiguration(adminKey: string): any {
    return this.http.get(`${BackendService.backendURL}api/admin/reloadConfiguration/adminKey/${adminKey}`);
  }

  public getSupporters(): any {
    return this.http.get(`${BackendService.backendURL}api/app/getSupporters`);
  }

  public getClosestFancyCity(lat: number, lon: number, minPop: number) {
    return this.http.get(`${BackendService.backendURL}api/geo/getClosestFancyCity/lat/${lat}/lon/${lon}/minPop/${minPop}`);
  }


}
