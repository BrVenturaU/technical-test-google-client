import { localStorageManager } from "../utils/LocalStorageManager";

export default function guest({ next, store }) {
    const token = localStorageManager.getFromLocalStorage("session_token");
    console.log(token && !store.getters["user/authUser"]);
    if (token && !store.getters["user/authUser"]) {
      store.dispatch("user/getProfile").then(() => {
        if (store.getters["user/authUser"]) {
            next({ name: "Map" });
        } else {
          store.dispatch("user/logout");
          next();
        }
      });
    } else {
      next();
    }
}
  