<template>
  <div v-if="!data.hidden">
    <menu-item
      v-if="!data.children || data.children.length == 0"
      :index="data.path"
      :badge="$store.getters[data.badge]"
      :icon="data.meta ? data.meta.icon : undefined"
      :title="data.meta ? data.meta.title : undefined"
    />
    <menu-item
      v-if="data.children && data.children.length == 1"
      :index="data.children[0].path"
      :badge="$store.getters[data.badge]"
      :icon="data.children[0].meta ? data.children[0].meta.icon : undefined"
      :title="data.children[0].meta ? data.children[0].meta.title : undefined"
    />
    <template v-if="data.children && data.children.length > 1">
      <el-badge
        :value="$store.getters[data.badge] || null"
        :max="99"
        :class="data.meta.icon ? 'item-icon' : 'item'"
      >
        <el-submenu :index="data.path" :key="data.name">
          <template slot="title">
            <i v-if="data.meta && data.meta.icon" :class="[data.meta.icon]"></i>
            <span slot="title">{{ data.meta.title }}</span>
          </template>
          <template v-for="(menu, index) in data.children">
            <Menu :key="index" :data="menu" />
          </template>
        </el-submenu>
      </el-badge>
    </template>
  </div>
</template>
<script>
import MenuItem from "./MenuItem.vue";
// import {mapGetters } from "vuex";
export default {
  name: "Menu",
  components: { MenuItem },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style lang="less" scoped>
.item {
  width: 100%;
  /deep/ .el-badge__content.is-fixed {
    right: auto;
    top: 25px;
    left: 6em;
  }
}
.item-icon {
  width: 100%;
  /deep/ .el-badge__content.is-fixed {
    right: auto;
    top: 25px;
    left: 8em;
  }
}
</style>
