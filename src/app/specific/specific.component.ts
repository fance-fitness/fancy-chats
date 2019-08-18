import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['../shared-styles.css']
})
export class SpecificComponent implements OnInit {
  public chatId;
  public gegebeneAntwort = '';
  public isUserAFriend = false;

  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) { }

  public ngOnInit(  )   {
    this.activatedRoute.queryParams.subscribe(params => this.chatId = params.chatId);
  }

  public answer(gegebeneAntwort) {
    this.isUserAFriend = this.authenticationService.isFriend(gegebeneAntwort);
  }

}
