<template>
  <div class="address-list">
    <h2>Address List</h2>
    <p class="fs-md lh-normal">red means address beyond 5 miles,not support</p>
    <el-alert
            class="mb-1"
            :key="index"
            :closable="false"
            v-for="(item,index) in data"
            :title="item.description"
            :type="item.valid == 1 ? 'success' : 'error'"
    >
    </el-alert>
  </div>
</template>
<script>
  import { axios } from "../../../http/request";

  export default {
    name: "AddressList",
    components: {},
    data() {
      return {
        data: []
      };
    },
    mounted() {
      this.getAddressData();
    },
    methods: {
      getAddressData() {
        this.listAddressApi()
            .then(res => {
              if(res.flag) {
                this.data = res.data;
              }
            })
      },
      listAddressApi() {
        return axios({
          url: "/address/list",
          method: "get"
        })
      }
    }
  };
</script>
<style lang="less" scoped></style>
