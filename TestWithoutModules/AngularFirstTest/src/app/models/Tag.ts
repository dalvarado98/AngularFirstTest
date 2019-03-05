export class Tag {
  tagId:number;
  name: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
