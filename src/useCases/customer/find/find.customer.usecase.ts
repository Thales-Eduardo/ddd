import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputFindCustomerDTOs,
  OutputFindCustomerDTOs,
} from "./find-customer.DTOS";

export class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputFindCustomerDTOs): Promise<OutputFindCustomerDTOs> {
    const responseCustomer = await this.customerRepository.find(input.id);

    return {
      id: responseCustomer.id,
      name: responseCustomer.name,
      address: {
        street: responseCustomer.Address.street,
        city: responseCustomer.Address.city,
        number: responseCustomer.Address.number,
        zip: responseCustomer.Address.zip,
      },
    };
  }
}
