import {axios} from "../../http/request";
import Vue from "vue";
import {COOKIE} from "../mutation-types";
import Cookie from "js-cookie";
const user = {
  state: {
    username: "",
    admin: 0,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp57JPZvfUQ3w_DtINdM-e7tzr2ko9GPxkdg&usqp=CAU"
  },
  actions: {
    Login({commit}, params) {
      return loginApi(params)
          .then(res => {
            if(res.flag) {
              commit("SET_USERNAME",res.data.userName);
              commit("SET_ADMIN",res.data.isAdmin);
              Cookie.set(COOKIE, Date.now().toString());
              Vue.ls.set("username",res.data.userName);
              Vue.ls.set("admin",res.data.isAdmin);
              return Promise.resolve();
            }else {
              return Promise.reject(res.message);
            }
          })
    },
    Logout() {
      Cookie.remove(COOKIE);
      Vue.ls.clear();
      return logoutApi()
          .then(res => {
            if(res.flag) {
              return Promise.resolve();
            }else{
              return Promise.reject();
            }
          })
    }
  },
  mutations: {
    SET_USERNAME(state,value) {
      state.username = value;
    },
    SET_ADMIN(state, value) {
      state.admin = value;
    }
  }
};
function loginApi(data) {
  return axios({
    url: "/private/login",
    method: "post",
    data
  })
}
function logoutApi() {
  return axios({
    url: "/private/logout",
    method: "get"
  })
}
export default user;
