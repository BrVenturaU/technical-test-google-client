export default function auth({ to, next, store }) {
    const loginQuery = { name: "Login", query: { redirect: to.fullPath } };
    if (!store.getters["user/authUser"]) {
        store.dispatch("user/getProfile").then(() => {
            if (!store.getters["user/authUser"]) next(loginQuery);
            else next();
        });
    } else {
        next();
    }
  }
  