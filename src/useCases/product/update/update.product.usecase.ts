import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDTOs,
  OutputUpdateProductDTOs,
} from "./update.product.dto";

export class UpdateProductUseCase {
  private productRepositoryInterface: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepositoryInterface = productRepository;
  }

  async execute(
    input: InputUpdateProductDTOs
  ): Promise<OutputUpdateProductDTOs> {
    const product = await this.productRepositoryInterface.find(input.id);

    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productRepositoryInterface.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
