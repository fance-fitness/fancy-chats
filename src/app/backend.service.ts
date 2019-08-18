import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEvent } from './types';
import { IChat } from './landing-page/landing-page.component';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public constructor(private http: HttpClient) { }


  public static planBBackendURL = 'https://fance-stiftung.de/';
  public static backendURL = 'https://art-consulting.org/';
  public static frontendURL = 'https://dance-planner.de/';

  // public static planBBackendURL = 'http://localhost:3000/';
  // public static backendURL = 'http://localhost:3000/';
  // public static frontendURL = 'http://localhost:4200/';



  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public addMessage(chat: IChat): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `${BackendService.backendURL}api/chats/addMessage`;
    // alert(`posting to ${url} for chat id: ${chat.id}`);
    return this.http.post<IEvent>(url, JSON.stringify(chat), httpOptions);

  }
  public getChat(chatId: string): any {
    const url = `${BackendService.backendURL}api/chats/getChat/chatId/${chatId}`;
    return this.http.get(url);
  }

  public createChat(chat: IChat): any {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `${BackendService.backendURL}api/chats/createChat`;
    // alert(`posting to ${url} for chat id: ${chat.id}`);
    return this.http.post<IEvent>(url, JSON.stringify(chat), httpOptions);  }

}
