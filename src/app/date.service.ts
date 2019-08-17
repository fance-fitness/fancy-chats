import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { texts } from './texts';
import { ITexts } from './types';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  public texts: ITexts = texts.filter((entry: ITexts) => entry.language === 'german')[0];

  public constructor() {
    // alert(moment('2020-01-01').format('YYYY-MM-DD'));
  }

  public enhanceDateString(date1: string, daysBetween: number): string {
    let enhancedDateString: string = date1;
    let numberOfWeeks = 12;
    let nextDate = date1;
    while (numberOfWeeks > 0) {
      nextDate = moment(nextDate).add(daysBetween, 'days').format('YYYY-MM-DD');
      enhancedDateString = `${enhancedDateString}, ${nextDate}`;
      numberOfWeeks--;
    }

    return enhancedDateString;
  }


  public isWeeklyEvent(date1: string, date2: string): boolean {

    const myDate1 = moment(date1);
    const myDate2 = moment(date2);

    const daysBetween = myDate2.diff(myDate1, 'days'); // 1

    return (daysBetween === 7) ? true : false;
  }

  public isByWeeklyEvent(date1: string, date2: string): boolean {

    const myDate1 = moment(date1);
    const myDate2 = moment(date2);

    const daysBetween = myDate2.diff(myDate1, 'days'); // 1

    return (daysBetween === 14) ? true : false;
  }

  public getNextFirstSunday() {

  }

  public getWeekDay(nextOccurrenceRaw: string, language: string): string {
    const weekdayNumber = moment(nextOccurrenceRaw).weekday();
    const myTexts = texts.filter((entry) => entry.language === language)[0];
    const weekdayText = myTexts.info.weekDays[weekdayNumber];
    return weekdayText;
  }

  public getAllXDays(date) {
    const wdText = this.texts.info.weekDays[0];
    // const wdText = this.texts.info.weekDays[moment(date).weekday()];

    return this.getAll(wdText, date);
  }

  public isEveryFirst(dates: string[]): any {


    let month = 100;
    const xDays: string[] = this.getAllXDays(dates[0]);
    // let which: number;

    // console.log(moment(dates[0]).dayOfYear());
    // console.log(moment(xDays[0]).dayOfYear());
    // if (moment(dates[0]).dayOfYear() === moment(xDays[0]).dayOfYear()) {
    //   which = 0;
    // } else if (moment(dates[0]).dayOfYear() === moment(xDays[1]).dayOfYear()) {
    //   which = 1;
    // } else if (moment(dates[0]).dayOfYear() === moment(xDays[2]).dayOfYear()) {
    //   which = 2;
    // } else if (moment(dates[0]).dayOfYear() === moment(xDays[3]).dayOfYear()) {
    //   which = 3;
    // } else if (moment(dates[0]).dayOfYear() === moment(xDays[4]).dayOfYear()) {
    //   which = 4;
    // } else if (moment(dates[0]).dayOfYear() === moment(xDays[5]).dayOfYear()) {
    //   console.log('a');
    //   return false;
    // }

    // console.log(which);
    for (const date of dates) {

      if (month === moment(date).month()) {
        console.log('b');
        return false;
      }

      if (moment(date).dayOfYear() !== moment(xDays[0]).dayOfYear()) {
        console.log('c');

        return false;
      }

      if (month !== 100 && moment(date).month() > month + 1) {
        console.log('d');


        return false;
      }
      month = moment(date).month();

    }

    return true;


    // const firstSunday = allSundays[0];
    // const firstMonday = allMondays[0];
    // const firstTuesday = allTuesday[0];
    // const firstWednesday = allWednesdays[0];
    // const firstThursday = allThursdays[0];
    // const firstFriday = allFridays[0];
    // const firstSaturday = allSaturdays[0];

    // console.log(JSON.stringify(allMondays));

    // const fancyWeekdays: number[] = [];
    // for (const date of dates) {
    //   console.log(moment(date).weekday());
    //   if (fancyWeekdays.indexOf(moment(date).weekday()) === -1) {
    //     fancyWeekdays.push(moment(date).weekday());
    //   } else {
    //     console.log('it seems weekly');
    //   }
    // }
    // return true;
  }

  private getAll(weekdayText: string, date: string) {
    const all: string[] = [];
    const monday = moment(date)
      .startOf('month')
      .day(weekdayText);
    if (monday.date() > 7) { monday.add(7, 'd'); }
    const month = monday.month();
    while (month === monday.month()) {
      all.push(monday.toString());
      // document.body.innerHTML += '<p>' + monday.toString() + '</p>';
      monday.add(7, 'd');
    }

    return all;

  }
}

