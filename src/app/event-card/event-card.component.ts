import { Component, OnInit, Input } from '@angular/core';
import { IEvent, ITexts } from '../types';
import { EventsService } from '../events.service';
import * as moment from 'moment';
import { DateService } from '../date.service';
import { texts } from '../texts';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['../shared-styles.css']
})
export class EventCardComponent implements OnInit {
  @Input() public event: IEvent;
  @Input() public selectedCity?: string;
  @Input() public positionIsClear?: boolean;
  @Input() public cityIsChosen?: boolean;
  public texts: ITexts = texts.filter((entry: ITexts) => entry.language === 'german')[0];
  public imgLink: string;
  public nextOccurrence = '';
  public nextOccurrenceRaw = '';
  public eventLink;
  public standardReportText = '';
  public reportedBecause = this.standardReportText;

  public constructor(private eventService: EventsService,
                     private dateService: DateService,
                     private backendService: BackendService) { }

  public ngOnInit() {
    this.imgLink = `${BackendService.backendURL}api/events/${this.event.posterURL}`;
    this.nextOccurrenceRaw = this.eventService.getNextOccurrence(this.event.date.split(','));
    const trimmed = this.nextOccurrenceRaw.trim();
    this.nextOccurrence = `${trimmed.substr(8, 2)}.${trimmed.substr(5, 2)}.${trimmed.substr(0, 4)}`;
    this.eventLink = `https://dance-planner.de/?eventId=${this.event.id}`;

    if (this.event.title === '' || this.event.title === undefined) {
      this.event.title = this.eventService.getTitleFromDance(this.event.dance);
    }
    if (this.event.link.substr(0, 4) === 'www.') {
      this.event.link = this.event.link.replace('www.', 'https://www.');
    }
  }

  public getFacts(): string {
    if (moment(this.nextOccurrenceRaw).isSame(moment(), 'days')) {
      return `${this.texts.info.todayIn} ${this.event.location}`;
    }
    if (moment(this.nextOccurrenceRaw).isSame(moment().add(1, 'days'), 'days')) {
      return `${this.texts.info.tomorrowIn} ${this.event.location}`;
    } else {
      return `${this.dateService.getWeekDay(this.nextOccurrenceRaw, 'german')} ${this.nextOccurrence} in ${this.event.location}`;
    }
  }

  public getDistance(): number {
    return this.event.distance;
  }

  public report() {
    if (confirm(`Bist Du sicher, dass Du diesen Chat mit der Nachricht "${this.reportedBecause}" melden möchtest?`)) {
      this.event.reportedBecause = this.reportedBecause;

    }
  }

  public findCompany() {
    alert('Dieser Service steht erst ab Oktober bereit.');
  }
  // private getWhatsAppLink() {
  //   const no = this.eventService.getNextOccurrence(this.event.date.split(','));
  //   const link = `https://dance-planner.de?day=${this.dateService.getWeekDay(no, 'english')}`;
  //   return link;
  // }


}
