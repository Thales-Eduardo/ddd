import { EventHandlerInterface } from "../../../../shared/event/interface/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendEmailWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Sending email to .....${JSON.stringify(event, null, 2)}`);
  }
}
