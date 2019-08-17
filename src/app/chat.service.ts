import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }


  public redirect(input: string): any {

    switch (input.toLowerCase()) {
      case 'monday':
        document.location.href = 'https://chat.whatsapp.com/CBU73BL7SptJDf3p1R5mMq';
        break;
      case 'tuesday':
        document.location.href = 'https://chat.whatsapp.com/IDQQisk7vUzAHHgF1UM7To';
        break;
      case 'wednesday':
        document.location.href = 'https://chat.whatsapp.com/Gvz4aq6Jvgq6elxNRKnbc4';
        break;
      case 'thursday':
        document.location.href = 'https://chat.whatsapp.com/GhqSHLSGMF7L06DnsWPxYr';
        break;
      case 'friday':
        document.location.href = 'https://chat.whatsapp.com/Epx3YNiXdrFC0dYHF6BnA8';
        break;
      case 'saturday':
        document.location.href = 'https://chat.whatsapp.com/Is6qY0QZ0WHLA83yoDVJWp';
        break;
      case 'sunday':
        document.location.href = 'https://chat.whatsapp.com/KGe9ZxqVTg77DNvORCONol';
        break;
      default: document.location.href = 'https://dance-planner.de';
    }

  }
}
