import { UserProps } from './User';

type Callback = () => void;

export class Eventing {
  constructor() {
    this.trigger = this.trigger.bind(this);
    this.on = this.on.bind(this);
  }
  events: { [key: string]: Callback[] } = {};

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    handlers &&
      handlers.length > 0 &&
      handlers.forEach((callback) => callback());
    return;
  }
}
