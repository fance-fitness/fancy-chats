import { IEvent } from './types';

export class EventsHelper {


    public static sortByReviewed(events: IEvent[]) {
        return events.sort((event1, event2) => {
            if (event1.reviewed > event2.reviewed) {
                return 1;
            }

            if (event1.reviewed < event2.reviewed) {
                return -1;
            }

            return 0;

        });
    }

}
