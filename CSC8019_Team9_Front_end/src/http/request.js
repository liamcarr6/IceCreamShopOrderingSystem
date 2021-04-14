import axios from "axios";
import store from "../store";
import router from "../router";
import Vue from "vue";
import { ACCESS_TOKEN, EXPIRE_TIME, REMEMBER_ME } from "@/store/mutation-types";

const service = axios.create({
  timeout: 6000,
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true
});

const err = error => {
  if (error.response) {
    if (error.response.status === 403) {
      console.log(error.response);
    } else if (error.response.status === 401) {
      store.dispatch("Logout");
    } else if (error.response.status === 404) {
      console.log(error.response);
    } else if (error.response.status === 500) {
      console.log(error.response);
    }
  } else {
    console.log(error.response);
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(config => {
  return config;
}, err);

// response interceptor
service.interceptors.response.use(response => {
  let data = response.data,
    rememberMe = Vue.ls.get(REMEMBER_ME),
    token = Vue.ls.get(ACCESS_TOKEN);
  if (token && !rememberMe) {
    Vue.ls.set(ACCESS_TOKEN, token, EXPIRE_TIME);
  }
  if (data.statusCode == 401) {
    Vue.ls.clear();
    router.push("/private/login");
  }
  return response.data;
}, err);

export { service as axios };
