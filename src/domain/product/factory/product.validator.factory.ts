import { ValidatorInterface } from "../../../shared/validator/validator.interface";
import { Product } from "../entities/product";
import { ProductYupValidator } from "../validator/product.yup.validator";

export class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}
