import { randomUUID } from "node:crypto";
import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entities/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    const id = randomUUID();

    const customer = new Customer(id, "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: id,
    };

    const output = {
      id: id,
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
