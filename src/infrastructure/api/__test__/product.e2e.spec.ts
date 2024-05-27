import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "product test e2e",
      price: 89,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("product test e2e");
    expect(response.body.price).toBe(89);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "product test e2e",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app).post("/product").send({
      name: "product test e2e list 1",
      price: 89,
    });
    expect(response.status).toBe(200);
    const response2 = await request(app).post("/product").send({
      name: "product test e2e list 2",
      price: 69,
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("product test e2e list 1");
    expect(product1.price).toBe(89);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("product test e2e list 2");
    expect(product2.price).toBe(69);
  });
});
