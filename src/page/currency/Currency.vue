<template lang="html">
  <div class="p-currency">

    <common-header class="header">
      我的积分
      <router-link
        slot="right"
        to="/currency/detail">
        充值记录
      </router-link>
    </common-header>

    <section class="m-currency-panel">
      <h3>当前积分</h3>
      <p>0</p>
    </section>

    <ul class="m-box-model m-entry-group padding">
      <router-link
        to="/currency/recharge"
        tag="li"
        class="m-entry">
        <v-icon
          class="m-entry-prepend"
          type="wallet-recharge"/>
        <span class="m-text-box m-flex-grow1">充值积分</span>
        <v-icon
          class="m-entry-append"
          type="base-arrow-r"/>
      </router-link>
      <router-link
        to="/currency/withdraw"
        tag="li"
        class="m-entry">
        <v-icon
          class="m-entry-prepend"
          type="wallet-withdraw"/>
        <span class="m-text-box m-flex-grow1">提取积分</span>
        <v-icon
          class="m-entry-append"
          type="base-arrow-r"/>
      </router-link>
    </ul>
    <footer>
      <router-link
        to="/currency/rule"
        tag="p">
        <v-icon
          style="vertical-align: bottom;"
          type="wallet-alert-circle"/>
        充值提现规则
      </router-link>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Currency",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: "CURRENTUSER",
      currency: "CURRENTUSER.currency"
    })
  }
};
</script>

<style lang="less" scoped>
@import "./currency.less";
</style>
