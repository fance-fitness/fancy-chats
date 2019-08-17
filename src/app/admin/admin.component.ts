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
    this.backendService.getEventsWithSecretIds(this.adminKey)
      .subscribe((result: IEvent[]) => {
        this.eventsWithSecrets = EventsHelper.sortByReviewed(result);
      }, error => {
        BackendService.backendURL = BackendService.planBBackendURL;
        this.backendService.getEventsWithSecretIds(this.adminKey)
        .subscribe((result: IEvent[]) => {
          this.eventsWithSecrets = EventsHelper.sortByReviewed(result);
        });
      });
  }

  public getMaintainLink(event: IEvent) {
    return `${BackendService.frontendURL}?maintain=true&eventId=${event.id}&version=${event.version}`;
  }

  public displayReportedEvents() {
    this.backendService.getReportedEvents(this.adminKey)
      .subscribe((result: IEvent[]) => {
        this.eventsWithSecrets = result;
      });
  }

  public sortByLastOccurrence() {
    this.eventsWithSecrets.map((entry: IEvent) => {
      const datesArray = entry.date.split(',');
      const eventWithLastOccurrence: IEventWithLastOccurrence = {
        currentlyLastOccurrence: datesArray[datesArray.length - 1],
        event: entry
      };
      this.eventsWithLastOccurrence.push(eventWithLastOccurrence);
    });
  }
  public deleteReport(event: IEvent) {
    this.backendService.deleteReport(event, this.adminKey)
    .subscribe((result) => {
      if (result.success) {
        alert('Report deleted successfully');
      }
    });
  }

  public reloadConfiguration() {
    this.backendService.reloadConfiguration(this.adminKey)
      .subscribe((result) => {
        if (result.success) {
          alert('Configuration reloaded successfully');
        } else {
          alert('hmm');
        }
      });
  }
  public getTestMaintainUrl() {
    return `${BackendService.frontendURL}?maintain=true&eventId=1565356511978&secretId=0.23754185275152895`;
  }

  public triggerConsistencyCheck() {
    this.backendService.triggerConsistencyCheck(this.adminKey)
      .subscribe((result) => {
        if (result.success) {
          alert('Data is consistent');
        } else {
          alert('Data is inconsistent');
        }
      });
  }

  public findDuplicates() {
    this.eventsWithSecrets = this.eventsWithSecrets.filter((entry: IEvent) => {

      const currentEvent = entry;
      let isDuplicate = false;
      this.eventsWithSecrets.map((myEntry: IEvent) => {
        if (myEntry.link === currentEvent.link) {
          if (myEntry.id === currentEvent.id) {
            isDuplicate = false;
          } else {
            isDuplicate = true;
          }

        }
      });

      return isDuplicate;

    });
  }

  public fetchDataFromSystem() {
    if (confirm('Bist Du sicher?')) {
      if (confirm('Bist Du wirklich sicher?')) {
        if (confirm('Noch einmal Bist Du wirklich sicher?')) {
          this.backendService.fetchDataFromSystem(this.adminKey, 'dance-planner.com')
          .subscribe((result) => {
            if (result.success) {
              alert('erledigt');
            } else {
              alert('etwas hat nicht geklappt');
            }

          });
        }
      }
    }
  }
  public triggerBackup() {
    this.backendService.triggerBackup(this.adminKey)
      .subscribe((result) => {
        if (result.success) {
          alert('Backup created');
        } else {
          alert('hmm');
        }
      });
  }

  public confirmReview(event: IEvent) {
    if (confirm('Mit dem Klick auf \'OK\' bestätigst Du, dass Du dieses Event erfolgreichgeprüft hast.')) {
      this.backendService.markAsReviewed(this.adminKey, event.id, event.version)
        .subscribe((result) => {
          if (result.success) {
            alert('Successfully marked as reviewed');
          } else {
            alert('hmmmm');
          }

        });
    }
  }

  public extendDatesRange(event) {
    const dates = event.date.split(',');
    if (this.dateService.isWeeklyEvent(dates[0], dates[1])) {
      event.date = this.dateService.enhanceDateString(dates[0], 7);
    } else if (this.dateService.isByWeeklyEvent(dates[0], dates[1])) {
      event.date = this.dateService.enhanceDateString(dates[0], 14);
  }

    this.backendService.updateDates(event, this.adminKey)
      .subscribe((result) => {
        if (result.success) {
          alert('Geilo. Das hat geklappt.');
        } else {
          alert('Etwas ist schiefgelaufen.');
        }
      });

  }
}


// http://localhost:4200/?eventId=1565129581117&secretId=0.0667029157803567
