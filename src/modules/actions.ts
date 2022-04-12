import { Room } from "@/types/Building";
import axios from "axios";

export function actions() {
  return {

    SET_APP_LOADING(this: any, payload: boolean): void {
      this.appLoading = payload;
    },
    SET_CONTENT_LOADING(this: any, payload: boolean): void {
      this.contentLoading = payload;
    },
    SET_SHOW_NAVBAR(this: any, payload: boolean): void {
      this.showNavBar = payload
    },
    SET_ROOM(this: any, payload: Room): void {
      this.room = payload
    }
  }
}
