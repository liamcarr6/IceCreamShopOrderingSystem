import Vue from "vue";
import VueStorage from "vue-ls";

const storageOptions = {
  namespace: "odd_",
  name: "ls",
  storage: "local"
};
Vue.use(VueStorage, storageOptions);
