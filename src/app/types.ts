
export const appId = 'dancePlanner';
export interface IInfo {
  shortTitleOfTheApp: string;
  longTitleOfTheApp: string;
  location: string;
  chooseDanceStyle: string;
  chooseCity: string;
  whereIsTheEvent: string;
  noMatchFound: string;
  eventsInRange: string;
  distanceUnitShort: string;
  distanceUnitLong: string;
  todayIn: string;
  tomorrowIn: string;
  niceYouAreInterested: string;
  shareTheFollowingLinkWithFriends: string;
  hereYouFindTheWhatsAppGroup: string;
  hereYouFindTheTelegramGroup: string;
  createNewEvent: string;
  createNewVersion: string;
  createEvents: string;
  contact: string;
  danceAndMusicStyle: string;
  date: string;
  linkToFurtherInfo: string;
  telegramLink: string;
  whatsAppLink: string;
  comments: string;
  title: string;
  addThisDate: string;
  searchEvents: string;
  showCitiesWithMinimum: string;
  inhabitants: string;
  weekDays: string[];
}

export interface ITexts {
  language: string;
  info: IInfo;
}

export interface IEvent {
  id: string;
  version: string;
  secretId: string;
  dance: string;
  location: string;
  date: string;
  posterURL: string;
  link: string;
  title: string;
  comments: string;
  createdFromLatitude: number;
  createdFromLongitude: number;
  eventLatitude: number;
  eventLongitude: number;
  distance: number;
  reviewed: string;
  reportedBecause: string;
  supporter: string;
}

export interface ICity {
  name: string;
  country: string;
  altCountry: string;
  muni: string;
  muniSub: string;
  featureClass: string;
  featureCode: string;
  adminCode: string;
  population: number;
  lat: number;
  lon: number;
}

export const initialRange = 700;
export const maxRange = 1000;

export enum mode {
  // rangeBased = 'rangeBased',
  // cityBased = 'cityBased',
  chatRedirect = 'chatRedirect',
  //  maintain = 'maintain',
  specific = 'specific',
  straightForward = 'straightForward',
  maintain = 'maintain'
}

export const dances = [
  'Salsa',
  'Bachata',
  'Merengue',
  'Kizomba',
  'Zouk',
  'Tango',
  'Rumba',
  'Mambo',
  'Zumba',
  'Orientalischer Tanz',
  'Hip Hop',
  'Dancehall'
];
export const introTexts = ['Get', 'ready', 'to', 'dance'];
