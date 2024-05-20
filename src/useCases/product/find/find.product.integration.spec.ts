import { randomUUID } from "node:crypto";
import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entities/product";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";

describe("Test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: randomUUID(),
    };

    const output = {
      id: input.id,
      name: "find a product",
      price: 23,
    };

    await productRepository.create(new Product(input.id, "find a product", 23));

    const product = await usecase.execute(input);

    expect(product).toEqual(output);
  });
});
