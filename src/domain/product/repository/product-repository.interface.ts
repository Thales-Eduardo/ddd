import { RepositoryInterface } from "../../../shared/repository/repository-interface";
import { Product } from "../entities/product";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
