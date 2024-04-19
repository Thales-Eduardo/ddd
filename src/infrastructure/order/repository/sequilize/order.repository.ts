import { Order } from "../../../../domain/checkout/entities/order";
import { OrderItem } from "../../../../domain/checkout/entities/order_item";
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

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        total: entity.total(),
      },
      { where: { id: entity.id } }
    );

    const orderModel: OrderModel | any = await OrderModel.findOne({
      where: { id: entity.id },
      include: ["items"],
    });

    const items = orderModel.toJSON().items;
    const existingItemIds = items.map((item: any) => item.id);

    for (const updatedItem of entity.items) {
      if (existingItemIds.includes(updatedItem.id)) {
        await OrderItemModel.update(
          {
            product_id: updatedItem.productId,
            quantity: updatedItem.quantity,
            name: updatedItem.name,
            price: updatedItem.price,
          },
          { where: { id: updatedItem.id } }
        ).catch(console.log);
      }
    }
  }

  async find(id: string): Promise<Order> {
    const order: Order | any = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });

    const orderItem: OrderItem[] = [];
    const existingItemIds = order.toJSON().items.map((item: any) => item.id);
    for (const dataItems of order.items) {
      if (existingItemIds.includes(dataItems.id)) {
        orderItem.push(
          new OrderItem(
            dataItems.id,
            dataItems.name,
            dataItems.price,
            dataItems.product_id,
            dataItems.quantity
          )
        );
      }
    }

    return new Order(order.id, order.customer_id, orderItem);
  }

  async findAll(): Promise<Order[]> {
    const orders: Order | any = await OrderModel.findAll({
      include: ["items"],
    });

    return orders.map((order: OrderModel) => {
      const orderItems: OrderItem[] = order.items.map(
        (item: OrderItemModel) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          );
        }
      );
      const orderInstance = new Order(order.id, order.customer_id, orderItems);
      return orderInstance;
    });
  }
}
