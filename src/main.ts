import { Address } from "./entities/address";
import { Customer } from "./entities/customer";
import { Order } from "./entities/order";
import { OrderItem } from "./entities/order_item";

const customerId = "123";
let customer = new Customer(customerId, "Thales");
let addAddress = new Address(12, "36204555", "BH", "avenida");
customer.addAddress = addAddress;
// agregado com relação de id

// agregado com relação de objeto de entidade
const item1 = new OrderItem("1", "Item1", 10);
const item2 = new OrderItem("2", "Item2", 10);
const item3 = new OrderItem("3", "Item3", 10);
const order = new Order("idOrder", customerId, [item1, item2, item3]);
