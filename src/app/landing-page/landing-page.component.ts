import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mode } from '../types';

export interface IMessage {
  text: string;
  date: string;
  userOwner: boolean;
}

export interface IChat {
  id: string;
  messages: IMessage[];
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


  public constructor(private activatedRoute: ActivatedRoute) {}

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

}
