import { EventHandlerInterface } from "../../../../shared/event/interface/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  // aqui seria a implemetação do envio de emails
  // geralmente eu gosto de chamar essa pasta de providers
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to .....${event}`);
  }
}
