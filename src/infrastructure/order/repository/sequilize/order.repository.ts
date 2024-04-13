import { Order } from "../../../../domain/checkout/entities/order";
import { OrderRepositoryInterface } from "../../../../domain/checkout/repository/order-repository.interface";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  //impleementar para desafio e nos testes tmb
  async update(entity: Order): Promise<void> {
    // await OrderModel.update(
    //   {
    //     name: entity.name,
    //     price: entity.price,
    //   },
    //   {
    //     where: {
    //       id: entity.id,
    //     },
    //   }
    // );
  }

  async find(id: string): Promise<Order> {
    const productModel: Order | any = await OrderModel.findOne({
      where: { id },
    });
    return new Order(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Order[]> {
    const productModels: any[] = await OrderModel.findAll();
    return productModels;
    // .map
    // (productModel) =>
    //   new Order(productModel.id, productModel.name, productModel.price)
  }
}
