import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChat, IMessage } from '../landing-page/landing-page.component';
import { BackendService } from '../backend.service';
import * as moment from 'moment';

import { AuthenticationService } from '../authentication.service';
import { IEvent } from '../types';


@Component({
  selector: 'app-fancy-chat-box',
  templateUrl: './fancy-chat-box.component.html',
  styleUrls: ['./fancy-chat-box.component.css', '../shared-styles.css']
})
export class FancyChatBoxComponent implements OnInit {
  @Input() chatId;

  @Output() inputSent = new EventEmitter<string>();

  public colorBackRight = '#333';
  public colorFontRight = 'white';
  public colorBackLeft = '#333';
  public colorFontLeft = 'white';
  public width = '100%';
  public height = '450px';
  public border = '1px solid black';
  public isUserAFriend = false;
  public gegebeneAntwort = '';

  public chat: IChat;


  public textInput = '';

  public constructor(private backendService: BackendService,
                     private authenticationService: AuthenticationService) {}

  public ngOnInit() {
    this.isUserAFriend = this.authenticationService.isFriend();
    this.loadChat();
    setInterval(() => {
      this.loadChat();
    }, 30000);

  }

  public getChatLink() {
    return `${BackendService.frontendChatURL}?chatId=${this.chatId}`;
  }

  public loadChat() {
    this.backendService.getChat(this.chatId)
    .subscribe((chat: IChat) => {
      if (chat === undefined || chat === null) {
        this.createNewChatWithThisId();
      } else {
        this.chat = chat;
      }

    });
  }

  public createNewChatWithThisId(): any {

    this.backendService.getEvents().subscribe((events: IEvent[]) => {

      let welcomeMessage: IMessage;
      if (events.filter((entry: IEvent) => entry.id === this.chatId)[0]) {
        welcomeMessage = {
          text: `Willkommen im Chat zum Event mit der ID: ${this.chatId}. Liebe Grüße vom fancy Administrator.`,
          date: moment().format('MMMM Do YYYY, h:mm:ss a'),
          userOwner: true
        };
      } else {
        welcomeMessage = {
          text: `Willkommen im Chat. Liebe Grüße vom fancy Administrator.`,
          date: moment().format('MMMM Do YYYY, h:mm:ss a'),
          userOwner: true
        };
      }

      this.chat = {
        id: this.chatId,
        messages: [welcomeMessage],
        reportedBecause: ''
      };

      this.backendService.createChat(this.chat).subscribe(result => {
        if (result.success) {
          // no need for action
        } else {
          alert('Etwas ist schiefgelaufen.');
        }
      });


    });
  }

  public answer(gegebeneAntwort) {
    this.isUserAFriend = this.authenticationService.isFriend(gegebeneAntwort);
  }

  public sendTextInput() {
    if (this.textInput.length > 1) {

      const newMessage = {
        text: this.textInput,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        userOwner: true
      };
      this.chat.messages.push(newMessage);

      const chatForUpdate = Object.assign({}, this.chat);
      chatForUpdate.messages = [newMessage];

      this.backendService.addMessage(chatForUpdate)
      .subscribe((result) => {
        if (result.success) {
          // alert('Geilo. Das hat geklappt.');
        } else {
          alert('Etwas ist schiefgelaufen.');
        }
      });
      this.textInput = '';
    }
  }


  onKey(event: any) {
    if (event.keyCode === 13) {
      this.sendTextInput();
    }
  }
}
