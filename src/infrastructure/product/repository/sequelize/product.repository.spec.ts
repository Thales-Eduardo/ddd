import { randomUUID } from "node:crypto";
import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../../domain/product/entities/product";
import { ProductModel } from "./product.model";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product_id = randomUUID();

    const product = new Product(product_id, "Product 1", 100);

    await productRepository.create(product);

    const productModel: Product | any = await ProductModel.findOne({
      where: { id: product_id },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: product_id,
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product_id = randomUUID();

    const product = new Product(product_id, "Product 1", 100);

    await productRepository.create(product);

    const productModel: Product | any = await ProductModel.findOne({
      where: { id: product_id },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: product_id,
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2: Product | any = await ProductModel.findOne({
      where: { id: product_id },
    });

    expect(productModel2.toJSON()).toStrictEqual({
      id: product_id,
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product_id = randomUUID();

    const product = new Product(product_id, "Product 1", 100);

    await productRepository.create(product);

    const productModel: Product | any = await ProductModel.findOne({
      where: { id: product_id },
    });

    const foundProduct = await productRepository.find(product_id);

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product_id1 = randomUUID();
    const product = new Product(product_id1, "Product 1", 100);
    await productRepository.create(product);

    const product_id2 = randomUUID();
    const product2 = new Product(product_id2, "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(products).toEqual(foundProducts);
  });
});
