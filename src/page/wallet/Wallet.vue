<template lang="html">
  <div class="p-wallet wallet">

    <common-header class="header">
      钱包
      <router-link
        slot="right"
        :to="{ path: 'detail' }"
        append>
        明细
      </router-link>
    </common-header>

    <section class="m-wallet-panel">
      <h3>账户余额(元)</h3>
      <p>{{ balance }}</p>
    </section>
    <ul class="m-box-model m-entry-group padding">
      <router-link
        :to="{path: &quot;recharge&quot;}"
        append
        tag="li"
        class="m-entry">
        <svg class="m-style-svg m-svg-def m-entry-prepend">
          <use xlink:href="#wallet-recharge"/>
        </svg>
        <span class="m-text-box m-flex-grow1">充值</span>
        <svg class="m-style-svg m-svg-def m-entry-append">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#base-arrow-r"/>
        </svg>
      </router-link>
      <router-link
        :to="{path: &quot;withdraw&quot;}"
        append
        tag="li"
        class="m-entry">
        <svg class="m-style-svg m-svg-def m-entry-prepend">
          <use xlink:href="#wallet-withdraw"/>
        </svg>
        <span class="m-text-box m-flex-grow1">提现</span>
        <svg class="m-style-svg m-svg-def m-entry-append">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#base-arrow-r"/>
        </svg>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Wallet",
  data() {
    return {};
  },
  computed: {
    goldName() {
      const {
        site: { gold_name: { name = "金币" } = {} } = {}
      } = this.$store.state.CONFIG;
      return name;
    },
    user() {
      return this.$store.state.CURRENTUSER;
    },
    new_wallet() {
      return this.user.new_wallet || { balance: 0 };
    },
    balance() {
      return (this.new_wallet.balance / 100).toFixed(2);
    }
  }
};
</script>

<style lang="less" scoped>
@panel-color: #59b6d7;

.header {
  background-color: @panel-color;
  color: #fff;
  border-bottom: none;
  a {
    color: inherit;
  }
  .v-icon {
    color: #fff;
  }
}

.p-wallet {
  .entry__group:first-of-type {
    margin-top: 0;
  }
}
.m-wallet-panel {
  padding: 90px 30px 60px;
  color: #fff;
  font-size: 28px;
  background-color: @panel-color;
  h3 {
    opacity: 0.7;
  }
  p {
    margin-top: 80px;
    font-size: 100px;
    letter-spacing: 2px;
  }
}
</style>
