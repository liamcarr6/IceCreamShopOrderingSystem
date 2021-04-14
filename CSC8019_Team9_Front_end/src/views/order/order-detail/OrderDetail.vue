<template>
  <div>
    <h2>Order Chart</h2>
    <p>
      <el-tag class="mr-1">Select All：</el-tag>
      <el-checkbox @change="handleAllClick" v-model="orderAll"></el-checkbox>
    </p>
    <div v-for="(item, index) in data" :key="index" class="mb-1">
      <div class="flex">
        <h3 class="w-10 m-0">flavour name:</h3>
        <span style="flex: 1 1 auto">{{ item.name }}</span>
      </div>
      <div class="flex">
        <h3 class="w-10 m-0">order number:</h3>
        <span style="flex: 1 1 auto;">{{ item.orderNumber }}</span>
      </div>
      <div class="flex">
        <h3 class="w-10 m-0">contact:</h3>
        <span style="flex: 1 1 auto;">{{ item.contact }}</span>
      </div>
      <div class="flex">
        <h3 class="w-10 m-0">size:</h3>
        <span style="flex: 1 1 auto;">{{ item.size }}</span>
      </div>
      <div class="flex">
        <h3 class="w-10 m-0">type:</h3>
        <span style="flex: 1 1 auto;">{{
          item.type == 1 ? "delivery" : "collection"
        }}</span>
      </div>
      <div class="flex">
        <h3 class="w-10 m-0">state:</h3>
        <span style="flex: 1 1 auto">{{
          item.payed == 1 ? "payed" : "not payed"
        }}</span>
      </div>
      <div class="flex">
        <h3 class="w-10 m-0">price:</h3>
        <span style="flex: 1 1 auto">{{ item.price }}</span>
      </div>
      <div class="flex">
        <el-checkbox
          class="mt-0.5"
          v-if="item.payed == 0"
          v-model="item.checked"
          @change="handleOrderClick"
        ></el-checkbox>
        <el-tag type="success" v-if="item.payed == 1">Payed</el-tag>
      </div>
    </div>
    <el-button type="primary" @click="handlePayOrderList">Pay</el-button>
  </div>
</template>
<script>
import { getDate, getTime } from "../../../utils/timeUtil";
import { axios } from "../../../http/request";

export default {
  name: "OrderDetail",
  components: {},
  data() {
    return {
      data: [],
      orderAll: false,
      hasOrder: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getDataApi().then(res => {
        if (res.flag) {
          this.data = res.data.map(item => {
            item.checked = false;
            return item;
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleAllClick(value) {
      this.data.forEach(item => {
        (item.payed != 1) && (item.checked = value);
      })
    },
    handleOrderClick() {
      this.orderAll = this.data.filter(item => item.payed != 1 ).reduce((prev, next) => {
        return next.checked && prev;
      }, true);
    },
    handlePayOrderList() {
      this.data.filter(item => item.checked).forEach(item => {
        this.handlePay(item.price, item.orderNumber);
      })
    },
    handlePay(price, orderNumber) {
      let length = this.data.length;
      let data = {
        orderNumber,
        date: getDate(),
        time: getTime(),
        price: price
      };
      this.payApi(data).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "Paying",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
          loading.close();
          this.getData();
        }, 1000 * length);
      });
    },
    payApi(params) {
      return axios({
        url: "/money/pay",
        method: "get",
        params
      });
    },
    getDataApi() {
      return axios({
        url: "/order/list",
        method: "get"
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
