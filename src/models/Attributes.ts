export class Attributes<T> {
  private data: T;
  constructor(data: T) {
    this.data = data;
    this.get = this.get.bind(this);
  }
  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
