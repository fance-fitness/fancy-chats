import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static isUserAFriend = false;
  public korrekteAntwort = 'fance';

  constructor() { }

  public isFriend(answer?: string) {
    if (answer) {
      AuthenticationService.isUserAFriend = (answer === this.korrekteAntwort) ? true : false;
      return AuthenticationService.isUserAFriend;
    } else {
      return AuthenticationService.isUserAFriend;
    }

  }
}
