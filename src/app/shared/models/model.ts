export class Model<T> {
  id: string;

  constructor(config: Partial<T>) {
    Object.assign(this, config);
  }

  toJSON(): object {
    return JSON.parse(JSON.stringify(this));
  }
}
