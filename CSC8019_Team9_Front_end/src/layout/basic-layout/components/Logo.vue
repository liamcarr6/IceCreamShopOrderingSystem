<template>
  <div class="logo">
    <h2 v-if="!sidebar" class="tx-center">Ice Cream</h2>
    <h2 v-else>IC</h2>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Logo",
  computed: {
    ...mapGetters(["sidebar"])
  }
};
</script>
<style lang="less" scoped>
.logo {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  color: #fff;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
