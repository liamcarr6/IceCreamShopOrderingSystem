<template>
  <div class="user-layout">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "UserLayout",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.user-layout {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #ffdc7c;
}
</style>
