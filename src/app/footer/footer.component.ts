import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { texts } from '../texts';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../shared-styles.css']
})
export class FooterComponent {

  public texts = texts;
  public titleLong;
  public titleShort;

  public constructor(public router: Router) {
    this.titleLong = 'Fancy Dance Planner';
    this.titleShort = 'Dance Planner';
  }

  public clickContact() {
    this.router.navigateByUrl('/contact');
  }
}
