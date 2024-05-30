import { RepositoryInterface } from "../../../shared/repository/repository-interface";
import { Customer } from "../entities/Customer";

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
