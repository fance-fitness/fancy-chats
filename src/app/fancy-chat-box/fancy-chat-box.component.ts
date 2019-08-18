import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChat } from '../landing-page/landing-page.component';
import { BackendService } from '../backend.service';
import * as moment from 'moment';

@Component({
  selector: 'app-fancy-chat-box',
  templateUrl: './fancy-chat-box.component.html',
  styleUrls: ['./fancy-chat-box.component.css', '../shared-styles.css']
})
export class FancyChatBoxComponent implements OnInit {
  @Input() messages: any[];
  @Input() colorBackRight;
  @Input() colorFontRight;
  @Input() colorBackLeft;
  @Input() colorFontLeft;
  @Input() width;
  @Input() height;
  @Input() border;
  @Input() chatId;

  public chat: IChat;

  @Output() inputSent = new EventEmitter<string>();

  public textInput = '';

  public constructor(private backendService: BackendService) {}

  public ngOnInit() {
    this.loadChat();
    setInterval(() => {
      this.loadChat();
    }, 10000);
  }

  public loadChat() {
    this.backendService.getChat(this.chatId)
    .subscribe((chat: IChat) => {
      this.chat = chat;
      this.messages = this.chat.messages;
    });
  }

  sendTextInput() {
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
