import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

// M: model
// D: structure of data in model
export class Collection<M, D> {
  models: M[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: D) => M) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse) => {
      res.data.forEach((val: D) => {
        this.models.push(this.deserialize(val));
      });
      this.trigger('change');
    });
  }
}
