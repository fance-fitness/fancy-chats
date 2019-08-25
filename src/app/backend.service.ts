import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEvent } from './types';
import { IChat } from './landing-page/landing-page.component';

export interface IChatLink {
  originalLink: string;
  fancyLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public constructor(private http: HttpClient) {}


  public static frontendChatURL = 'https://fancy-chats.com/';
  public static frontendURL = 'https://dance-planner.de/';
  public static backendURL = 'https://fance-stiftung.de/';
  public static planBBackendURL = 'https://art-consulting.org/';

  // public static frontendChatURL = 'http://localhost:3000/';
  // public static planBBackendURL = 'http://localhost:3000/';
  // public static backendURL = 'http://localhost:3000/';
  // public static frontendURL = 'http://localhost:4200/';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getChatLinkFor(fancyId: string) {
    return this.get(
      `${BackendService.backendURL}api/chats/getChatLinkFor/id/${fancyId}`
    );
  }

  public addChatLink(chatLink: IChatLink): any {
    const url = `${BackendService.backendURL}api/chats/addChatLink`;
    return this.post(url, chatLink);
  }

  public getEvents(): any {
    return this.http.get(
      `${BackendService.backendURL}api/events/getFutureEvents`
    );
  }

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
    return this.http.post<IEvent>(url, JSON.stringify(chat), httpOptions);
  }

  private get(url: string) {
    console.log(`calling to get ${url}`);
    return this.http.get(url);
  }

  private post(url: string, body: any) {
    console.log(`calling to post to ${url}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(url, JSON.stringify(body), httpOptions);
  }
}
