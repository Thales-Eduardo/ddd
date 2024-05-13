import { randomUUID } from "node:crypto";
import { Customer } from "../../../domain/customer/entities/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

const id = randomUUID();
const customer = new Customer(id, "John");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

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

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);
    const input = {
      id: id,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
