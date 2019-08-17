import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fancy-chat',
  templateUrl: './fancy-chat.component.html',
  styleUrls: ['./fancy-chat.component.css']
})
export class FancyChatComponent implements OnInit {

  public messages = []

  public constructor() { }

  public ngOnInit() {
  }

  public onInputReceived(input: string) {
    const newMessage = {"text": input, "date":"", "userOwner":true};
    this.messages.push(newMessage);
    const newAnswer = {"text": "You said : " + input, "date": "", "userOwner": false};
    this.messages.push(newAnswer);
}

}
