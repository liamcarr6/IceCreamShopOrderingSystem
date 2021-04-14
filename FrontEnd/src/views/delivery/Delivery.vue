<template>
  <div class="delivery">
    <div v-for="(item,index) in data" :key="index" class="p-1" style="border: 1px solid yellowgreen">
      <div>
        <h1>delivery driver:</h1>
        <div>
          <h2>driver name:</h2>
          <span>{{item.name}}</span>
        </div>
        <div>
          <h2>driver work id</h2>
          <span>{{ item.workId }}</span>
        </div>
        <h1>order list:</h1>
        <div style="justify-content: space-between">
          <div class="flex mb-1" v-for="(order,index) in item.lists" :key="index">
            <div class="flex">
              <h2 class="m-0">order number:</h2>
              <span>{{ order.orderNumber }}</span>
            </div>
            <div class="flex">
              <h2 class="m-0">address:</h2>
              <span>{{ order.address }}</span>
            </div>
            <div class="flex">
              <h2 class="m-0">contact:</h2>
              <span>{{ order.contact }}</span>
            </div>
            <div class="flex">
              <h2 class="m-0">price:</h2>
              <span>{{ order.price }}</span>
            </div>
            <div class="flex">
              <h2 class="m-0">size:</h2>
              <span>{{ order.size }}</span>
            </div>
            <div class="flex">
              <h2 class="m-0">payed:</h2>
              <span>{{ order.payed == 1 ? 'payed' : 'not payed'}}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
  import {axios} from "../../http/request";

  export default {
    name: "Delivery",
    components: {},
    data() {
      return {
        data: []
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.getDataApi()
            .then(res => {
              if(res.flag) {
                this.data = res.data;
              }
            })
      },
      getDataApi() {
        return axios({
          url: "/order/schedule",
          method: "get"
        })
      }
    }
  };
</script>
<style lang="less" scoped></style>
