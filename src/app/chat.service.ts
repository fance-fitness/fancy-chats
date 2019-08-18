import { Injectable } from '@angular/core';
import * as nanoid from 'nanoid';
import { IChat } from './landing-page/landing-page.component';
import { BackendService } from './backend.service';
import { Router } from '@angular/router';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private backendService: BackendService,
              private router: Router,
              private eventService: EventsService) { }

  private isLegitimate() {
    return true;
  }

  public createChat(chatId?: string) {
    let chat: IChat;

    if (chatId) {
      if (this.isLegitimate()) {

        chat = {
          id: chatId,
          messages: [],
          reportedBecause: ''
        };
      } else {
        alert('Dieser Chat scheint veraltet');
      }
    } else {
      chat = {
        id: nanoid().substring(14),
        messages: [],
        reportedBecause: ''
      };
    }

    this.backendService.createChat(chat)
      .subscribe(result => {
        if (result.success) {
          this.router.navigateByUrl(`/specific?chatId=${chat.id}`);
        } else {
          alert('Etwas ist schiefgelaufen.');
        }
      });
    }


}
