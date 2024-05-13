import { EventHandlerInterface } from "../../../../shared/event/interface/event-handler.interface";
import { CustomerUpdatedEvent } from "../customer-updated.event";

export class UpdateCustomerAddress
  implements EventHandlerInterface<CustomerUpdatedEvent>
{
  handle(event: CustomerUpdatedEvent): void {
    const data: any = event;
    console.log(
      `Endereço do cliente: ${data.id}, ${data.nome} alterado para: ${data.endereco}`
    );
  }
}
