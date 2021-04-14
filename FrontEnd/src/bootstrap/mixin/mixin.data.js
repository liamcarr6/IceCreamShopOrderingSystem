import Vue from "vue";
const showSuccess = process.env.VUE_APP_SHOW_SUCCESS;
Vue.extend({
  data() {
    return {
      showSuccess
    };
  }
});
