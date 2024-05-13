import { EventInterface } from "../../../shared/event/interface/event.interface";

export class CustomerUpdatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
