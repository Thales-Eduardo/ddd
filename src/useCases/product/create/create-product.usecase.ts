import { Product } from "../../../domain/product/entities/product";
import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDTOs,
  OutputCreateProductDTOs,
} from "./create-product.DTOs";

export class CreateProductUseCase {
  private productRepositoryInterface: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepositoryInterface = productRepository;
  }

  async execute(
    input: InputCreateProductDTOs
  ): Promise<OutputCreateProductDTOs> {
    const res = ProductFactory.create(input.type, input.name, input.price);
    console.log("res", res);

    const product = new Product(res.id, res.name, res.price);

    await this.productRepositoryInterface.create(product);

    return {
      id: res.id,
      name: res.name,
      price: res.price,
    };
  }
}
