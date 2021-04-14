<template>
  <el-badge :value="badge" :max="99" :class="icon ? 'item-icon' : 'item'">
    <el-menu-item @click="handleMenuClick" :disabled="disabled" :index="index">
      <i v-if="icon" :class="[icon]"></i>
      <span slot="title">{{ title }}</span>
    </el-menu-item>
  </el-badge>
</template>
<script>
export default {
  name: "MenuItem",
  props: {
    index: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    badge: {
      type: Number,
      default: null
    }
  },
  methods: {
    handleMenuClick() {
      let path = this.index;
      let size = this.$store.getters.size,
        sidebar = this.$store.getters.sidebar;
      this.$router.push({ path: path });
      if (size == "xs" && sidebar) {
        this.$store.commit("SET_SIDEBAR", false);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.item {
  width: 100%;
  /deep/ .el-badge__content.is-fixed {
    right: auto !important;
    top: 50% !important;
    left: 10em !important;
    transform: translateY(-50%) !important;
  }
}
.item-icon {
  width: 100%;
  /deep/ .el-badge__content.is-fixed {
    right: auto !important;
    top: 50% !important;
    left: 12em !important;
    transform: translateY(-50%) !important;
  }
}
</style>
