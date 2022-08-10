import ENV from "../config";
import axios from "axios";

type Method = "post" | "put" | "patch" | "get" | "delete"

export default class RequestService {
  public data: any;

  request = (path: string, method: Method = "get", data: FormData | object | null = null): Promise<any> => {
    return new Promise((resolve, reject) => {
      const queries = location.search ? location.search : ""
      axios.request({
        method: method,
        baseURL: ENV.API,
        url: "/rooms/"+ path + "/?week=1",//+queries,
        data: data,
      }).then((response: any) => {
        resolve(response.data)
      }).catch((error: Error) => {
        // console.log(error)
        reject(false)
      })
    })
  }
  getRoomId = ():string => {
    let path: string = window.location.pathname;
    path = path.replace('/viterve-test','')
    const repath = path.length>0? path.split("/")[1].replace("/", ""):"";
    return repath;
  }

  getRoom(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.getRoomId()!=="404"){
        this.request(this.getRoomId()).then(response => {
          this.data = response
          resolve(response)
        }).catch((e: Error) =>{
          reject(false)
        })
      }else{
        reject("404")
      }
    })
  }
}