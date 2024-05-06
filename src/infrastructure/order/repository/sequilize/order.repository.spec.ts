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

  it("should update a order", async () => {
    const CustomerId = randomUUID();
    const ProductId = randomUUID();
    const orderItemId = randomUUID();
    const OrderId = randomUUID();

    const customerRepository = new CustomerRepository();
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

    const orderModel1: OrderModel | any = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel1.toJSON()).toStrictEqual({
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

    //att order
    product.changeName("Product 2");
    product.changePrice(200);
    await productRepository.update(product);

    const orderItem2 = new OrderItem(
      orderItemId,
      "Product 2",
      200,
      product.id,
      2
    );
    const order2 = new Order(OrderId, CustomerId, [orderItem2]);
    await orderRepository.update(order2);

    const orderModel: OrderModel | any = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: OrderId,
      customer_id: CustomerId,
      total: order2.total(),
      items: [
        {
          id: orderItem2.id,
          order_id: OrderId,
          product_id: ProductId,
          quantity: orderItem2.quantity,
          name: orderItem2.name,
          price: orderItem2.price,
        },
      ],
    });
  });

  it("should find a order", async () => {
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

    const response = await orderRepository.find(order.id);

    expect(orderModel.toJSON()).toStrictEqual({
      id: response.id,
      customer_id: response.customerId,
      total: order.total(),
      items: [
        {
          id: response.items[0].id,
          name: response.items[0].name,
          price: response.items[0].price,
          quantity: response.items[0].quantity,
          order_id: OrderId,
          product_id: ProductId,
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const CustomerId1 = randomUUID();
    const ProductId1 = randomUUID();
    const orderItemId1 = randomUUID();
    const OrderId1 = randomUUID();

    const customerRepository = new CustomerRepository();
    const customer1 = new Customer(CustomerId1, "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address1);
    await customerRepository.create(customer1);

    const productRepository = new ProductRepository();
    const product1 = new Product(ProductId1, "Product 1", 10);
    await productRepository.create(product1);

    const orderItem1 = new OrderItem(
      orderItemId1,
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const CustomerId2 = randomUUID();
    const ProductId2 = randomUUID();
    const orderItemId2 = randomUUID();
    const OrderId2 = randomUUID();
    const customer2 = new Customer(CustomerId2, "Customer 2");
    const address2 = new Address("Street 2", 1, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);
    const product2 = new Product(ProductId2, "Product 2", 10);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem(
      orderItemId2,
      product2.name,
      product2.price,
      product2.id,
      4
    );

    const order1 = new Order(OrderId1, CustomerId1, [orderItem1]);
    const order2 = new Order(OrderId2, CustomerId2, [orderItem2]);

    const orderRepository = new OrderRepository();
    await Promise.all([
      orderRepository.create(order1),
      orderRepository.create(order2),
    ]);

    const allOrder: any = await orderRepository.findAll();

    expect(order1.id).toBe(allOrder[0]._id);
    expect(order2.id).toBe(allOrder[1]._id);
  });
});
