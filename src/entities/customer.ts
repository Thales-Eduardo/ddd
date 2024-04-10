import { Address } from "./address";

export class Customer {
  Address(arg0: number, arg1: string, arg2: string, arg3: string) {
    throw new Error("Method not implemented.");
  }
  private _id: string;
  private _name: string;
  private _address?: Address;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._id.length <= 0) {
      throw new Error("id is required");
    }
    if (this._address !== undefined) {
      throw new Error("name is required");
    }
    if (this._name.length <= 0) {
      throw new Error("name is required");
    }
  }

  set addAddress(address: Address) {
    this._address = address;
  }
}

let customer = new Customer("1234", "");
console.log(customer);
