import axios, { AxiosPromise } from 'axios';
import { UserProps } from './User';

interface HasId {
  // optional property
  id?: number;
}

export class ApiSync<T extends HasId> {
  // rootUrl
  // http://localhost:3000/users
  constructor(public rootUrl: string) {}

  // fetch promise
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      // put
      return axios.put(`${this.rootUrl}/${id}`, data);
    }
    // post
    return axios.post(this.rootUrl, data);
  }
}
