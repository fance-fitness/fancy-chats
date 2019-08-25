import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as nanoid from 'nanoid';
import { AuthenticationService } from '../authentication.service';
import { BackendService, IChatLink } from '../backend.service';

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
  public whatsAppGroupInvitationLink = '';
  public telegramGroupInvitationLink = '';
  public yourFancyLink = '';
  public gegebeneAntwort = '';
  public isUserAFriend = false;
  fancyIdFromParams = '';
  chatClient = '';

  public constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private backendService: BackendService
  ) {}

  public setChatClient(name: string) {
    this.chatClient = name;
  }
  private handleResult(result: IChatLink) {
    document.location.href = result.originalLink;
  }

  private handleErrorGettingOriginalLink(error) {
    console.log(error.message);
    BackendService.backendURL = BackendService.planBBackendURL;
    this.backendService
    .getChatLinkFor(this.fancyIdFromParams)
    .subscribe((result: IChatLink) => this.handleResult(result));
  }

  public ngOnInit() {
    this.playIntro();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.f) {
        this.fancyIdFromParams = params.f;
        this.backendService
          .getChatLinkFor(this.fancyIdFromParams)
          .subscribe((result: IChatLink) => this.handleResult(result),
          error => this.handleErrorGettingOriginalLink(error)
          );
      }
    });
  }

  private playIntro() {
          let seconds = 0;
          for (const info of this.infosToUser) {
        setTimeout(() => {
          this.infoToUser = info;
        }, seconds);
        seconds = seconds + 1000;
      }

  }
  // this.activatedRoute.queryParams.subscribe(params => {
  //   if (params.chatId) {
  //     this.chatId = params.chatId;
  //     this.infoToUser = '';
  //     this.showSpecific = true;
  //   } else {
  //     let seconds = 0;
  //     for (const info of this.infosToUser) {
  //       setTimeout(() => {
  //         this.infoToUser = info;
  //       }, seconds);
  //       seconds = seconds + 1000;
  //     }
  //   }
  // });

  public generateFancyLinkForWhatsApp() {
      if (
        this.whatsAppGroupInvitationLink.indexOf(
          'https://chat.whatsapp.com/'
        ) !== 0
      ) {
        alert(
          'Bitte gib hier den Whats App Gruppenlink ein. Dieser startet mit https://chat.whatsapp.com/'
        );
      } else {
        this.backendService.addChatLink({originalLink: this.whatsAppGroupInvitationLink, fancyLink: ''})
        .subscribe((result: IChatLink) => {
            this.yourFancyLink =  result.fancyLink;
      });
  }
}

public generateFancyLinkForTelegram( ) {

  if (
    this.telegramGroupInvitationLink.indexOf(
      'https://t.me/joinchat/'
    ) !== 0
  ) {
    alert(
      'Bitte gib hier den Telegram Gruppenlink ein. Dieser startet mit https://t.me/joinchat/'
    );
  } else {
    this.backendService.addChatLink({originalLink: this.telegramGroupInvitationLink, fancyLink: ''})
    .subscribe((result: IChatLink) => {
        this.yourFancyLink =  result.fancyLink;
  });
}

}
  private createRandomID() {
    const id = nanoid().substr(5, 4);
    return id;
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
