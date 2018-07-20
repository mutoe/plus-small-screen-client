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
        <v-icon
          class="m-entry-prepend"
          type="wallet-recharge"/>
        <span class="m-text-box m-flex-grow1">充值</span>
        <v-icon
          class="m-entry-append"
          type="base-arrow-r"/>
      </router-link>
      <router-link
        :to="{path: &quot;withdraw&quot;}"
        append
        tag="li"
        class="m-entry">
        <v-icon
          class="m-entry-prepend"
          type="wallet-withdraw"/>
        <span class="m-text-box m-flex-grow1">提现</span>
        <v-icon
          class="m-entry-append"
          type="base-arrow-r"/>
      </router-link>
    </ul>
    <footer>
      <router-link
        to="/wallet/rule"
        tag="p">
        <v-icon
          :width="0.3"
          style="vertical-align: bottom;"
          type="wallet-alert-circle"/>
        充值提现规则
      </router-link>
    </footer>
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
  padding: 60px 30px;
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
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1rem;

  p {
    font-size: 26px;
    color: #999;
  }
}
</style>
