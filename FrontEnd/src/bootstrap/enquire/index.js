import enquireUtil from "@/utils/enquire";
import store from "../../store";
const callback = function(size) {
  store.commit("SET_SIZE", size);
};
enquireUtil(callback);
