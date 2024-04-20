import { EventDispatcher } from "../../../../shared/event/implementations/event-dispatcher";
import { CustomerFactory } from "../../factory/customer.factory";
import { Address } from "../../value-object/address";
import { SendEmailWhenCustomerIsCreatedHandler } from "./send-email-when-customer-is-created.handler";
import { UpdateCustomerAddress } from "./update-customer-address.handler";

describe("Customer event handler unit test", () => {
  it("you must create a customer with an address and send a welcome email", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();

    const address = new Address("Street", 1, "13330-250", "São Paulo");
    let customer = CustomerFactory.createWithAddress("John", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);

    const eventData: any = customer;
    eventHandler.handle(eventData);

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("must update a customer's address and triggers update event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new UpdateCustomerAddress();

    const address = new Address("Street", 1, "13330-250", "São Paulo");
    let customer = CustomerFactory.createWithAddress("John", address);

    const newAddress = new Address("Street", 19, "13330-111", "Minas Gerais");
    customer.changeAddress(newAddress);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(newAddress);

    const eventData: any = {
      id: customer.id,
      nome: customer.name,
      endereco: `${newAddress.city} - ${newAddress.number} - ${newAddress.street} - ${newAddress.zip}`,
    };
    eventHandler.handle(eventData);

    eventDispatcher.register("CustomerUpdateCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerUpdateCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerUpdateCreatedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerUpdateCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });
});
