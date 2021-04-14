<template>
  <div class="not-found full-screen">
    <el-button class="back" @click="handleReturn">Return Home</el-button>
  </div>
</template>
<script>
export default {
  name: "404",
  data() {
    return {};
  },
  methods: {
    handleReturn() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="less" scoped>
.not-found {
  background: url("../../assets/images/404/404.png") center / contain no-repeat;

  .back {
    position: absolute;
    left: 51%;
    top: 65%;
  }
}
</style>
