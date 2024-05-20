import { randomUUID } from "node:crypto";
import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entities/product";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { UpdateProductUseCase } from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: randomUUID(),
      name: "product 1",
      price: 26,
    };

    await productRepository.create(new Product(input.id, "product", 23));

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
