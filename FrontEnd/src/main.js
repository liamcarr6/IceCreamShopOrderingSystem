import { Vue, router, store, App } from "./bootstrap/core";
import "./bootstrap/index";
import "./permission";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
