import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';
import { ChatService } from '../chat.service';
import { BackendService } from '../backend.service';
import * as moment from 'moment';
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
  public chat: IChat;
  public mode = mode.common;
  public infosToUser: string[] = ['Get', 'ready', 'to', 'chat', ''];
  public infoToUser = this.infosToUser[0];

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private chatService: ChatService,
    private backendService: BackendService
  ) {}

  public messages = [];

  public ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.chatId) {
        this.mode = mode.specific;
        this.backendService.getChat(params.chatId).subscribe((chat: IChat) => {
          this.chat = chat;
          this.messages = this.chat.messages;
        });
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

  onInputReceived(input: string) {
    const newMessage = {
      text: input,
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      userOwner: true
    };
    this.messages.push(newMessage);
    const newAnswer = {
      text: 'You said : ' + newMessage.text,
      date: newMessage.date,
      userOwner: false
    };
    this.messages.push(newAnswer);
  }
}
