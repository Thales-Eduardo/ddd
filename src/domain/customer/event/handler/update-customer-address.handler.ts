import { EventHandlerInterface } from "../../../../shared/event/interface/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class UpdateCustomerAddress
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    const data: any = event;
    console.log(
      `Endereço do cliente: ${data.id}, ${data.nome} alterado para: ${data.endereco}`
    );
  }
}
