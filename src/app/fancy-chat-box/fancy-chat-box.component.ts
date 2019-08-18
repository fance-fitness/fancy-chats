import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChat } from '../landing-page/landing-page.component';
import { BackendService } from '../backend.service';
import * as moment from 'moment';

import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-fancy-chat-box',
  templateUrl: './fancy-chat-box.component.html',
  styleUrls: ['./fancy-chat-box.component.css', '../shared-styles.css']
})
export class FancyChatBoxComponent implements OnInit {
  @Input() messages: any[];
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
                     private chatService: ChatService,
                     private authenticationService: AuthenticationService) {}

  public ngOnInit() {
    this.isUserAFriend = this.authenticationService.isFriend();
    this.loadChat();
  }

  public getChatLink() {
    return `${BackendService.frontendURL}?chatId=${this.chatId}`;
  }
  public loadChat() {
    this.backendService.getChat(this.chatId)
    .subscribe((chat: IChat) => {
      if (chat) {
        this.chat = chat;
        this.messages = this.chat.messages;
        setInterval(() => {
          this.loadChat();
        }, 30000);

      } else {

        this.chatService.createChat(this.chatId);
      }
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
      this.messages.push(newMessage);

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
