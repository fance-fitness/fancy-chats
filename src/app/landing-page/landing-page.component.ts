import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IEvent,
  typeAheadSettings,
  initialRange,
  ITexts,
  mode,
  dances
} from '../types';
import { EventsService } from '../events.service';
import * as arrayMove from 'array-move';
import { CitiesService } from '../cities.service';
import { ChatService } from '../chat.service';
import { texts } from '../texts';
import { BackendService } from '../backend.service';
import { GeoService } from '../geo.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../shared-styles.css']
})
export class LandingPageComponent implements OnInit {
  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private chatService: ChatService,
    private backendService: BackendService
  ) {}

  public texts: ITexts = texts.filter(
    (entry: ITexts) => entry.language === 'german'
  )[0];
  public readonly selectDanceText = this.texts.info.chooseDanceStyle;
  public readonly selectCityText = this.texts.info.chooseCity;

  public dances = dances;
  public cityNames: string[] = [];
  public typeAheadSettings = typeAheadSettings;
  public previousCity = '';
  public dates = [];
  public minPop = 70000;
  public selectedDance = this.selectDanceText;
  public selectedCity = this.selectCityText;
  public relevantEvents: IEvent[] = [];
  public allEvents: IEvent[] = [];
  public initializationComplete = false;
  public selectedDate;
  public geolocationPosition: any;
  public myRange = initialRange;
  public mode: string;
  public numberOfLocationDetectionTrials = 0;
  // public infosToUser: string [] = ['Live', 'Love', 'Dance', 'Fance'];
  public infosToUser: string[] = ['Get', 'ready', 'to', 'chat'];
  public infoToUser = this.infosToUser[0];
  public citiesRaw;
  public params;
  public activatedRouteURLResult;
  public nothingFoundText =
    'Zu den eingegeben Daten haben wir aktuell kein Event in unserer Datenbank. Bitte gedulde Dich noch ein paar Wochen. Wir haben den dance-planner.de erst gestartet :)';
  public positionIsClear = false;
  public prevSelectedCity = '';

  public ngOnInit() {
    this.dances = this.dances.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    });
    this.dances.unshift(this.selectDanceText);

    this.getUsersLocation();

    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;

      if (this.params.day) {
        this.mode = mode.chatRedirect;
      } else if (this.params.maintain && this.params.eventId) {
        this.mode = mode.maintain;
      } else if (this.params.eventId) {
        this.mode = mode.specific;
      } else {
        this.mode = mode.straightForward;
      }

      if (this.mode !== mode.chatRedirect) {
        this.getCities();
      }
    });

    let seconds = 0;
    for (const info of this.infosToUser) {
      setTimeout(() => {
        this.infoToUser = info;
      }, seconds);
      seconds = seconds + 1000;
    }

    setTimeout(() => {
      this.backendService
        .getClosestFancyCity(
          GeoService.usersLatitude,
          GeoService.usersLongitude,
          this.minPop
        )
        .subscribe((result: any) => {
          this.selectedCity = result.city;
          this.prevSelectedCity = this.selectedCity;
        });
      this.handleMode(this.mode);
      this.infoToUser = '';
    }, 4000);
  }

  private tryToGetLocationAgain() {
    setTimeout(() => {
      if (GeoService.usersLatitude === 0) {
        if (
          this.router.url === '/' &&
          confirm(
            'Möchtest Du Tanzevents in Deiner Nähe finden?. Falls ja gib mir bitte 4 Sekunden. Falls Die Seite dann nicht automatisch neu lädt, kann ich aus irgendeinem Grund Deine Position auf der Erde nicht ermitteln.'
          )
        ) {
          this.getUsersLocation();
          setTimeout(() => {
            if (GeoService.usersLatitude !== 0) {
              this.handleMode(this.mode); // to refresh things
            }
          }, 4000);
        }
      }
    }, 42000);
  }

  private handleMode(currentMode: string) {
    if (this.numberOfLocationDetectionTrials === 1 && GeoService.usersLatitude === 0) {
      this.tryToGetLocationAgain();
    }

    switch (currentMode) {
      case mode.chatRedirect: {
        this.chatService.redirect(this.params.day);
        break;
      }
      case mode.specific: {
        this.retrieveRelevantEvents(false, this.params.eventId);
        break;
      }
      default: {
        this.retrieveRelevantEvents(true);
        break;
      }
    }
  }

  public filterByLocation() {
    this.relevantEvents = this.relevantEvents.filter((event: IEvent) => {
      if (
        event.location.indexOf(this.selectedCity) !== -1 ||
        event.location.indexOf(this.selectedCity.toLowerCase()) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  public clickNewEvent() {
    this.router.navigateByUrl('/new-event');
  }

  public getUsersLocation() {
    this.numberOfLocationDetectionTrials++;
    GeoService.getLocation();
  }

  public updateCityNames() {
    this.cityNames = CitiesService.prepareCityNames(
      this.citiesRaw,
      this.minPop,
      this.texts.info.chooseCity
    );
  }

  public handlePackageFromBackend(
    data: IEvent[],
    rangeBased: boolean,
    eventId?: string
  ) {
    this.allEvents = data.filter(
      (event: IEvent) => event.reviewed.indexOf('reported') === -1
    );
    this.allEvents = this.eventsService.sortEvents(this.allEvents);
    this.relevantEvents = this.allEvents;

    if (this.selectedDance !== this.selectDanceText) {
      this.filterByDance();
    }

    if (eventId !== undefined) {
      const theSpecificEvent = this.relevantEvents.filter(
        (event: IEvent) => event.id === eventId
      )[0];

      const indexOfTheRequestedEventInArray = this.relevantEvents.indexOf(
        theSpecificEvent
      );
      if (indexOfTheRequestedEventInArray !== 0) {
        this.relevantEvents = arrayMove(
          this.relevantEvents,
          indexOfTheRequestedEventInArray,
          0
        );
      }
    }

    if (rangeBased) {
      this.relevantEvents = this.relevantEvents.filter((event: IEvent) => {
        if (event.distance <= this.myRange) {
          return true;
        } else {
          return false;
        }
      });

      if (this.relevantEvents.length === 0) {
        this.infoToUser = this.nothingFoundText;
      }
    }
  }

  public retrieveRelevantEvents(rangeBased: boolean, eventId?: string) {
    this.positionIsClear = (GeoService.usersLatitude === 0) ? false : true;
    if (this.prevSelectedCity === this.selectedCity) {
      this.handlePackageFromBackend(this.allEvents, rangeBased); // from a previous call
    } else if (this.prevSelectedCity === '' && GeoService.usersLatitude !== 0) {
      this.backendService
        .getFutureEvents(GeoService.usersLatitude, GeoService.usersLongitude)
        .subscribe((data: IEvent[]) => {
          this.handlePackageFromBackend(data, rangeBased, eventId);
        });
    } else if (this.selectedCity !== this.selectCityText) {
      const cityData = this.citiesRaw.filter(
        city => city.name === this.selectedCity
      )[0];
      this.backendService
        .getFutureEvents(cityData.lat, cityData.lon)
        .subscribe((data: IEvent[]) => {
          this.handlePackageFromBackend(data, rangeBased, eventId);
        });
    } else {
      this.backendService
        .getFutureEvents(GeoService.usersLatitude, GeoService.usersLongitude)
        .subscribe((data: IEvent[]) => {
          this.handlePackageFromBackend(data, rangeBased, eventId);
        });
    }
  }

  private getCities() {
    this.backendService.getCities('DE', 1000).subscribe(
      (raw: any) => {
        this.citiesRaw = raw;
        this.cityNames = CitiesService.prepareCityNames(
          raw,
          this.minPop,
          this.texts.info.chooseCity
        );
      },
      error => {
        BackendService.backendURL = BackendService.planBBackendURL;
        this.backendService.getCities('DE', 1000).subscribe((raw: any) => {
          this.citiesRaw = raw;
          this.cityNames = CitiesService.prepareCityNames(
            raw,
            this.minPop,
            this.texts.info.chooseCity
          );
        });
      }
    );
  }

  private filterByDance() {
    this.relevantEvents = this.relevantEvents.filter((event: IEvent) => {
      if (
        event.dance.indexOf(this.selectedDance) !== -1 ||
        event.dance.indexOf(this.selectedDance.toLowerCase()) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  // public isThereAtLeastOneEventForDanceAndLocation() {
  //   const inGeneral = this.allEvents.filter((event: IEvent) => {
  //     if (event.dance.toLowerCase() === this.selectedDance.toLowerCase() &&
  //       event.location.toLowerCase() === this.selectedCity.toLowerCase()) {
  //       return true;
  //     }
  //   });

  //   return inGeneral.length > 0;
  // }

  // private filterByDate() {
  //   this.backendService.notify(`filter called for ${this.selectedDate}`)
  //     .subscribe();
  //   this.relevantEvents = this.relevantEvents.filter((event: IEvent) => event.date.indexOf(this.selectedDate) !== -1);
  // }
}
