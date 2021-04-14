<template>
  <div>
    <div :class="['logo', sidebar && 'has-logo']">
      <logo />
    </div>
    <el-scrollbar>
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="$route.path"
        :background-color="variables.grey1"
        text-color="#fff"
        active-text-color="orange"
        :collapse="size != 'xs' ? sidebar : false"
        :unique-opened="true"
        mode="vertical"
      >
        <Menu v-for="(menu, index) in routes" :key="index" :data="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Menu from "../../../components/menu/Menu.vue";
import Logo from "./Logo.vue";
import variables from "../../../bootstrap/style/constant/index.less";

export default {
  name: "SideBar",
  components: { Logo, Menu },
  computed: {
    ...mapGetters(["sidebar", "routes", "size"])
  },
  data() {
    return {
      variables
    };
  }
};
</script>
<style lang="less" scoped></style>
