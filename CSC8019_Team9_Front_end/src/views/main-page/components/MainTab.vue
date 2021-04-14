<template>
  <div class="main-tab">
    <div class="tab-title">
      <div :key="index" v-for="(tab,index) in tabs" @click="currentIndex = index" :class="[currentIndex == index && 'active-tab']">
        {{ tab }}
      </div>
    </div>
    <div class="tab-content" v-if="currentIndex == 0">
      <h3>CONTACT-FREE DELIVERY</h3>
      <p>
        Our deliveries are carried out in a way that guarantees the safety of our customers and drivers. All orders will nedd to be paid online by credit/debit card.
      </p>
      <div style="display: flex">
        <input style="width: 100%" type="text" placeholder="Postcode">
        <button style="flex: 0 0 auto" @click="handleStartMyOrder">Start my Order</button>
      </div>
    </div>
    <div class="tab-content" v-if="currentIndex == 1">
      <h3>CONTACT-FREE COLLECTION</h3>
      <p>Our restaurant is operating contact-free collection following government guidelines and regulations.Click below to place your order.</p>
      <button @click="handleStartMyOrder">Start my Order</button>
    </div>
    <div class="tab-content" v-if="currentIndex == 2">
      <h3>Eat-In</h3>
      <p>Unforunately due to current circumstances we cannot allow customer's to eat on the premises. Collection and delivery are still available.</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MainTab",
    components: {},
    data() {
      return {
        tabs: ["Delivery","Collection","Eat-In"],
        currentIndex: 0,
      };
    },
    methods: {
      handleStartMyOrder() {
        this.$router.push({path: "/private/login"});
      }
    }
  };
</script>
<style lang="less" scoped>
  .main-tab {
    background-color: #fff;
  }
  .tab-title {
    display: flex;
    justify-content: space-between;
    background-color: #ffdc7c;
    div {
      width: 31%;
      height: 50px;
      font-size: 24px;
      text-align: center;
      cursor: pointer;
      line-height: 50px;
      background-color: #cccccc;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
  .tab-content {
    padding: 1em 2em;
    font-size: 20px;
  }
  .active-tab {
    background-color: #fff !important;
    color: #ffdc7c;
  }
</style>
