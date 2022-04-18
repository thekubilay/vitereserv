// import { Vacancy } from "@/types/Room"
interface Error {
  title: string,
  text: string
}

export function actions() {
  return {
    SET_ERROR(this: any, payload: Error): void {
      this.error = payload
    }

    // SET_APP_LOADING(this: any, payload: boolean): void {
    //   this.appLoading = payload;
    // },
    // SET_CONTENT_LOADING(this: any, payload: boolean): void {
    //   this.contentLoading = payload;
    // },
    // SET_SHOW_NAVBAR(this: any, payload: boolean): void {
    //   this.showNavBar = payload
    // },
    // SET_ROOM(this: any, payload: Room): void {
    //   this.room = payload
    // }
  }
}
