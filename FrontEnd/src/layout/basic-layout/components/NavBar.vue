<template>
  <div class="nav-bar">
    <hamburger
      cursor="pointer"
      class="hamburger px-2"
      :active="sidebar"
      @toggleClick="toggleClick"
    />
    <div class="user-control">
      <span class="user" cursor="pointer" @click="handlePrivate">
        <el-image :src="avatar"></el-image>
        <span>{{ username }}</span>
      </span>
      <span class="set" cursor="pointer" v-if="false">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span cursor="pointer"> <i class="el-icon-s-tools"></i>设置 </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="2">修改密码</el-dropdown-item>
            <el-dropdown-item command="1">清除缓存</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <span class="power" cursor="pointer" @click="handlePowerOff">
        <i
          style="font-size: 20px;color: #d82b15"
          class="el-icon-switch-button"
        ></i>
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Hamburger from "../../../components/hambuger/Hamburger.vue";

export default {
  name: "NavBar",
  components: { Hamburger },
  computed: {
    ...mapGetters(["sidebar", "avatar", "username"])
  },
  data() {
    return {};
  },
  methods: {
    toggleClick() {
      this.$store.commit("SET_SIDEBAR");
    },
    handleCommand(command) {
      switch (command) {
        case "1":
          this.clearCache();
          break;
        case "2":
          this.$router.push({ path: "/private/alter" });
          break;
      }
    },
    clearCache() {
      window.location.reload(true); // 强刷清除缓存
    },
    handlePowerOff() {
      this.$store.dispatch("Logout").then(() => {
        // this.$router.push("/private/login");
        window.location.reload();
      });
    },
    handlePrivate() {
      // this.$message.success("个人信息");
    }
  }
};
</script>
<style lang="less" scoped>
.nav-bar {
  height: 64px;

  .hamburger {
    display: inline-block;
    line-height: 64px;
    height: 64px;

    &:hover {
      background-color: #f2f6fc;
    }
  }

  .user-control {
    float: right;
    height: 64px;
    display: flex;
    align-items: center;
    margin-right: 5em;
    span {
      margin-right: 1em;
    }
    .user {
      display: flex;
      align-items: center;
      div {
        border-radius: 50%;
        box-shadow: 0 0 0 1px yellowgreen;
        margin-right: 0.3em;
        width: 32px;
        height: 32px;
      }
    }

    .set {
    }

    .power {
    }
  }
}
</style>
