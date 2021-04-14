import router from "@/router";
import Cookies from "js-cookie";
import store from "./store";
import Vue from "vue";
import { COOKIE } from "@/store/mutation-types";
import { setDocumentTitle, domTitle } from "@/utils/domUtil";
import { asyncRoutes } from "./router/config/router.config";
const whiteList = ["Login", "Register", "MainPage", "MainMenu", "OrderPage"];
router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.title) {
    setDocumentTitle(`${to.meta.title} - ${domTitle}`);
  }
  if (Cookies.get(COOKIE)) {
    if (!store.getters.username) {
      store.commit("SET_USERNAME", Vue.ls.get("username"));
      store.commit("SET_ADMIN", Vue.ls.get("admin"));
    }
    if (to.path === "/private/login") {
      next({ path: "/home" });
    } else {
      if (!store.getters.addRoutes) {
        if (store.getters.admin == 1) {
          store.commit("SET_ADD_ROUTES", asyncRoutes);
        } else {
          store.commit("SET_ADD_ROUTES", []);
        }
        console.log(store.getters.addRoutes);
        router.addRoutes(store.getters.addRoutes);
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 放行
      next();
    } else {
      // 去登录页面
      next({ path: "/private/login", query: { redirect: to.fullPath } });
    }
  }
});
