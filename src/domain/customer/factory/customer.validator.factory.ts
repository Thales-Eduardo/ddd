import { ValidatorInterface } from "../../../shared/validator/validator.interface";
import { Customer } from "../entities/Customer";
import { CustomerYupValidator } from "../validator/customer.yup.validator";

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}
