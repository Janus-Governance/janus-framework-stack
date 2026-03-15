import type { JanusEvent } from "./types";

export type EventHandler<TPayload extends object> = (
  event: JanusEvent<TPayload>,
) => void | Promise<void>;

export class EventBus<TPayload extends object> {
  private handlers: Array<EventHandler<TPayload>> = [];

  subscribe(handler: EventHandler<TPayload>): void {
    this.handlers.push(handler);
  }

  async publish(event: JanusEvent<TPayload>): Promise<void> {
    for (const handler of this.handlers) {
      await handler(event);
    }
  }
}
