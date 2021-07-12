import { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

const URI = 'http://localhost:3000/users';

export interface UserProps {
  id?: number;
  age?: number;
  name?: string;
}

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(URI);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');
    if (typeof id !== 'number') {
      throw new Error('Type of id must be a number');
    }
    this.sync
      .fetch(id)
      .then((res: AxiosResponse): void => {
        this.set(res.data);
      })
      .catch((err) => console.log(err));
  }

  save(): void {
    const { name, age } = this.attributes.getAll();
    this.sync
      .save({ name, age })
      .then((response: AxiosResponse) => {
        this.events.trigger('save');
      })
      .catch((err) => {
        this.events.trigger('error');
      });
  }
}
