import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export interface EventDispatcherInterface {
  /**
   *
   * @param event EventInterface
   * vai acionarar o event
   */
  notify(event: EventInterface): void;
  /**
   *
   * @param eventName string
   * @param eventHandler EventHandlerInterface
   * registra o nome do evento e o handeler
   */
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  /**
   *
   * @param eventName string
   * @param eventHandler EventHandlerInterface
   * para desregistrar um event
   */
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  /**
   * serve para desregistrar todos os event
   */
  unregisterAll(): void;
}
