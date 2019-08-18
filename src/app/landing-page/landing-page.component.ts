import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mode } from '../types';
import { ChatService } from '../chat.service';
import { AuthenticationService } from '../authentication.service';

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
  public infosToUser: string[] = ['Get', 'ready', 'to', 'chat', ''];
  public infoToUser = this.infosToUser[0];
  public messages = [];

  public constructor(private activatedRoute: ActivatedRoute,
                     private chatService: ChatService,
                     private router: Router) {}

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.chatId) {
        this.chatId = params.chatId;
        this.infoToUser = '';
        this.router.navigateByUrl(`/specific?chatId=${this.chatId}`);
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
    this.chatService.createChat();
  }
}
