import { randomUUID } from "node:crypto";
import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entities/product";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";

describe("Test list product use case", () => {
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

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const id1 = randomUUID();
    const id2 = randomUUID();

    await productRepository.create(new Product(id1, "list a product 1", 23));
    await productRepository.create(new Product(id2, "list a product 2", 26));

    const output = {
      products: [
        {
          id: id1,
          name: "list a product 1",
          price: 23,
        },
        {
          id: id2,
          name: "list a product 2",
          price: 26,
        },
      ],
    };

    const list = await useCase.execute({});

    expect(list).toEqual(output);
  });
});
