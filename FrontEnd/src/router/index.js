import Vue from "vue";
import VueRouter from "vue-router";
import { constantRoutes } from "./config/router.config";

Vue.use(VueRouter);
let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRoutes
});

export default router;
