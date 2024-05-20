import { Product } from "../../../domain/product/entities/product";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputListProductDTOs,
  OutputListProductDTOs,
} from "./list.product.dto";

export class ListProductUseCase {
  private productRepositoryInterface: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepositoryInterface = productRepository;
  }

  async execute(input: InputListProductDTOs): Promise<OutputListProductDTOs> {
    const products = await this.productRepositoryInterface.findAll();

    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(product: Product[]): OutputListProductDTOs {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
