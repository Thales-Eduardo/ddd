import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputFindProductDTOs,
  OutputFindProductDTOs,
} from "./find-product.DTOs";

export class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProductDTOs): Promise<OutputFindProductDTOs> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
