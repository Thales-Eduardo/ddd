import { randomUUID } from "node:crypto";
import { Product } from "../../../domain/product/entities/product";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = new Product(randomUUID(), "product", 23);

const input = {
  id: product.id,
  name: "product 1",
  price: 26,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
