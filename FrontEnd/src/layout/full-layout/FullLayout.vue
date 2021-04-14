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
        <div class="full-screen">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SideBar from "@/layout/basic-layout/components/SideBar";
import NavBar from "@/layout/basic-layout/components/NavBar";
export default {
  name: "FullLayout",
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
  height: calc(100% - 64px);
  box-sizing: border-box;
  background-color: #f0f2f5;
  position: relative;

  .full-screen {
    min-height: 100%;
    margin: 1em;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
  }
}
</style>
