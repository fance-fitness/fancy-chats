import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mode } from '../types';
import * as nanoid from 'nanoid';
import { BackendService } from '../backend.service';

export interface IMessage {
  text: string;
  date: string;
  userOwner: boolean;
}

export interface IChat {
  id: string;
  messages: IMessage[];
  reportedBecause: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../shared-styles.css']
})
export class LandingPageComponent implements OnInit {
  public chatId = '';
  public chat: IChat;
  public mode = mode.common;
  public infosToUser: string[] = ['Get', 'ready', 'to', 'chat', ''];
  public infoToUser = this.infosToUser[0];
  public messages = [];


  public constructor(private activatedRoute: ActivatedRoute,
                     private backendService: BackendService,
                     private router: Router) {}

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.chatId) {
        this.chatId = params.chatId;
        this.infoToUser = '';
        this.mode = mode.specific;
      } else {
        let seconds = 0;
        for (const info of this.infosToUser) {
          setTimeout(() => {
            this.infoToUser = info;
          }, seconds);
          seconds = seconds + 1000;
        }
      }
    });
  }

  public createChat() {
    const newChat: IChat = {
      id: nanoid().substring(14),
      messages: [],
      reportedBecause: ''
    };

    this.backendService.createChat(newChat)
    .subscribe((result) => {
      if (result.success) {
         alert('Geilo. Das hat geklappt.');
         this.router.navigateByUrl(`specific?chatId=${newChat.id}`);
      } else {
        alert('Etwas ist schiefgelaufen.');
      }
    });
  }
}
