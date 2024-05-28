import Notification from "../notification/notification";

export abstract class Entity {
  protected _id: string | undefined;
  public notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  get id(): string {
    return this._id || "";
  }
}
