<template>
  <div
    :class="[
      sidebar && size != 'xs' && 'hideSidebar',
      size == 'xs' && !sidebar && 'removeSidebar'
    ]"
  >
    <side-bar :class="['sidebar-container']" />
    <div :class="['main-container', sidebar && 'content-fluid']">
      <nav-bar />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SideBar from "./components/SideBar.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "BasicLayout",
  components: { SideBar, NavBar },
  computed: {
    ...mapGetters(["sidebar", "size"])
  }
};
</script>
<style lang="less" scoped>
.main-container {
  margin-left: 210px;
  height: 100vh;
  width: auto;
}
.content-fluid {
  margin-left: 64px;
}
.main-content {
  min-height: calc(100% - 64px);
  box-sizing: border-box;
  background-color: #f0f2f5;
  padding: 1em;
  position: relative;

  div {
    border-radius: 4px;
    padding: 1em;
    background: #fff;
  }
}
</style>
