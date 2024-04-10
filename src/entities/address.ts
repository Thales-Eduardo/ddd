export class Address {
  private _number: number;
  private _zip: string;
  private _city: string;
  private _street: string;

  constructor(number: number, zip: string, city: string, street: string) {
    this._number = number;
    this._zip = zip;
    this._city = city;
    this._street = street;

    this.validate();
  }

  validate() {
    if (this._number <= 0) {
      throw new Error("number is required");
    }
    if (this._zip.length <= 0) {
      throw new Error("zip is required");
    }
    if (this._city.length <= 0) {
      throw new Error("city is required");
    }
    if (this._street.length <= 0) {
      throw new Error("city is required");
    }
  }

  toString() {
    return `${this._street} ${this._number} ${this._zip} ${this._city}`;
  }
}
