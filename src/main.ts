import { Order } from "./domain/checkout/entities/order";
import { OrderItem } from "./domain/checkout/entities/order_item";
import { Customer } from "./domain/customer/entities/customer";
import { Address } from "./domain/customer/value-object/address";

const customerId = "123";
let customer = new Customer(customerId, "Thales");
let addAddress = new Address("Street 1", 123, "13330-250", "São Paulo");
customer.Address = addAddress;
// agregado com relação de id

// agregado com relação de objeto de entidade
const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
const item2 = new OrderItem("i2", "Item 1", 100, "p1", 2);
const item3 = new OrderItem("i3", "Item 1", 100, "p1", 2);
const order = new Order("idOrder", customerId, [item1, item2, item3]);
