import { Component, OnInit } from '@angular/core';
import { texts } from './texts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {

  public texts = texts.filter((entry) => entry.language === 'german')[0];
  public titleLong;
  public titleShort;

  public constructor() {
    this.titleLong = 'Fancy Chats';
    this.titleShort = 'Dance Planner';
  }

}
