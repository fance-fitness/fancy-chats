import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';
import { ChatService } from '../chat.service';
import { BackendService } from '../backend.service';
import * as moment from 'moment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../shared-styles.css']
})
export class LandingPageComponent implements OnInit {
  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private chatService: ChatService,
    private backendService: BackendService
  ) {}


  public messages = [];

  public ngOnInit() {

  }




    onInputReceived(input: string) {
        const newMessage = {text: input, date: moment().format('MMMM Do YYYY, h:mm:ss a'), userOwner: true};
        this.messages.push(newMessage);
        const newAnswer = {text: 'You said : ' + newMessage.text, date: newMessage.date, userOwner: false};
        this.messages.push(newAnswer);
    }
}
