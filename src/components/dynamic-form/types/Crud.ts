import {Method} from "axios";

export interface Crud {
  method: Method,
  url: string,
  store?: string,
  data?: any,
}