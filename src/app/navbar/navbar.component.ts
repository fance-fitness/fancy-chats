import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITexts } from '../types';
import { texts } from '../texts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public texts: ITexts = texts.filter((entry: ITexts) => entry.language === 'german')[0];
  public titleLong;
  public titleShort;
  public famousCounter = 0;
  public displayInput = false;
  public adminkey = '';

  constructor(public router: Router) {
    this.titleLong = 'Fancy Chats';
    this.titleShort = 'Fancy Chats';


  }

  public myFunction() {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }

  public clickSearch() {
    this.router.navigateByUrl('/');
  }

  public clickNewEvent() {
    this.router.navigateByUrl('/new-event');
  }

  public clickContact() {
    this.router.navigateByUrl('/contact');
  }

  public clickTitle() {
    this.famousCounter++;
    // https://dance-planner.de/?maintain=true&eventId=1565356511978&secretId=0.23754185275152895
    if (this.famousCounter === 1) {
      setTimeout(() => {
        if (this.famousCounter === 4) {
          this.router.navigateByUrl(`/admin`);
        } else if (this.famousCounter === 3) {
          this.router.navigateByUrl(`/insider`);
        }
      }, 2000);
    }

  }
}
