let API: string = "";
let HOST: string = "";
switch (import.meta.env.MODE) {
  case "development":
    API =  import.meta.env.VITE_APP_DATABASE_URL;
    HOST = import.meta.env.VITE_APP_HOST;
    break;
  case "production":
    API =  import.meta.env.VITE_APP_DATABASE_URL;
    HOST = import.meta.env.VITE_APP_HOST;
    break
  default:
    break;
}

export default {
  API,
  HOST
}
