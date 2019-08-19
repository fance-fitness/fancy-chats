import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as nanoid from 'nanoid';
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
  public showSpecific = false;

  public gegebeneAntwort = '';
  public isUserAFriend = false;

  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private authenticationService: AuthenticationService) {}

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.chatId) {
        this.chatId = params.chatId;
        this.infoToUser = '';
        this.showSpecific = true;
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

  public answer(gegebeneAntwort) {
    this.isUserAFriend = this.authenticationService.isFriend(gegebeneAntwort);
  }

  public createChatFromLandingPage() {
    this.chatId = nanoid();
    this.showSpecific = true;
    // this.router.navigateByUrl(`/specific?chatId=${nanoid()}`);
  }
}
