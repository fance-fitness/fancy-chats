import { Injectable } from '@angular/core';
import { IEvent } from './types';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public constructor() { }

  public getNextOccurrence(dates: string[]): string {
    for (const date of dates) {
      if (moment(date).isAfter(moment()) ||
        moment(date).isSame(moment(), 'days')) {
        return date;
      }
    }
  }

  public sortEvents(events: IEvent[]): IEvent[] {
    let eventsWithNextDate = [];
    for (const event of events) {
      const eventWithNextDate = {
        nextOccurrence: this.getNextOccurrence(event.date.split(',')),
        event
      };
      eventsWithNextDate.push(eventWithNextDate);
    }

    eventsWithNextDate = eventsWithNextDate.sort((event1, event2) => {
      if (moment(event1.nextOccurrence).isAfter(event2.nextOccurrence)) {
        return 1;
      }

      if (moment(event1.nextOccurrence).isBefore(event2.nextOccurrence)) {
        return -1;
      }

      return 0;
    });

    const result: IEvent[] = [];
    for (const preparedEvent of eventsWithNextDate) {
      result.push(preparedEvent.event);
    }
    return result;

  }

  public getTitleFromDance(danceRaw: string): string {
    const dances = danceRaw.split(',');
    let title = '';
    for (const dance of dances) {
      title = `${title} ${dance}`;
    }
    return title;
  }

}
