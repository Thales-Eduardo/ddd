import { randomUUID } from "node:crypto";
import { Product } from "../../../domain/product/entities/product";
import { FindProductUseCase } from "./find.product.usecase";

const id = randomUUID();
const product = new Product(id, "find a product", 23);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: id,
    };

    const output = {
      id: input.id,
      name: "find a product",
      price: 23,
    };

    const product = await usecase.execute(input);
    expect(product).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: id,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
