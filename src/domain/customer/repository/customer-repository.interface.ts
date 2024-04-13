import { RepositoryInterface } from "../../../shared/repository/repository-interface";
import { Customer } from "../entities/customer";

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
