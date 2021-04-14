import { constantRoutes } from "@/router/config/router.config";
const router = {
  state: {
    routes: constantRoutes,
    addRoutes: undefined
  },
  mutations: {
    SET_ADD_ROUTES(state, value) {
      state.addRoutes = value;
      state.routes = state.routes.concat(value);
    }
  }
};
export default router;
