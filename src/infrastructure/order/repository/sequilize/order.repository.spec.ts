import { randomUUID } from "node:crypto";
import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../domain/checkout/entities/order";
import { OrderItem } from "../../../../domain/checkout/entities/order_item";
import { Customer } from "../../../../domain/customer/entities/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import { Product } from "../../../../domain/product/entities/product";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { ProductModel } from "../../../product/repository/sequelize/product.model";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";
import { OrderRepository } from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "postgres",
      host: "localhost",
      username: "postgres",
      password: "docker",
      database: "ddd-fullcycle",
      port: 5432,
      define: {
        timestamps: true,
      },
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();

    const CustomerId = randomUUID();
    const ProductId = randomUUID();
    const orderItemId = randomUUID();
    const OrderId = randomUUID();

    const customer = new Customer(CustomerId, "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(ProductId, "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      orderItemId,
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order(OrderId, CustomerId, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel: OrderModel | any = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: OrderId,
      customer_id: CustomerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: OrderId,
          product_id: ProductId,
        },
      ],
    });
  });
});
