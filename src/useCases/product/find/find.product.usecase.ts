import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";

export class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(customerRepository: ProductRepositoryInterface) {
    this.productRepository = customerRepository;
  }
}
