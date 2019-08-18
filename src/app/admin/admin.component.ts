import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { IEvent, mode } from '../types';
import { EventsHelper } from '../events.helper';
import { DateService } from '../date.service';

interface IEventWithLastOccurrence {
  currentlyLastOccurrence: string;
  event: IEvent;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../shared-styles.css']
})

export class AdminComponent {
  public constructor(private backendService: BackendService, private dateService: DateService) { }


  public adminKey = '';
  public adminLink = '';
  public eventsWithSecrets: IEvent[] = [];
  public eventsWithLastOccurrence: IEventWithLastOccurrence[] = [];
  public currentlLastOccurrence;
  mode: any;

  public go() {
  }

  public getMaintainLink(event: IEvent) {
    return `${BackendService.frontendURL}?maintain=true&eventId=${event.id}&version=${event.version}`;
  }

  public displayReportedChats() {
    // this.backendService.getReportedEvents(this.adminKey)
    //   .subscribe((result: IEvent[]) => {
    //     this.eventsWithSecrets = result;
    //   });
  }

  public deleteReport(event: IEvent) {

  }


}


// http://localhost:4200/?eventId=1565129581117&secretId=0.0667029157803567
