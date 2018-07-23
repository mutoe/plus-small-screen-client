<template lang="html">
  <div class="p-currency-withdraw">

    <common-header class="header">
      积分提取
      <router-link
        slot="right"
        to="/currency/withdraw/detail">
        提取记录
      </router-link>
    </common-header>

    <section class="m-currency-panel">
      <h3>积分兑换余额</h3>
      <p>100积分=1.00元</p>
    </section>

    <main>
      <p>输入需提取的积分</p>
      <p>提取积分须提交官方审核，审核反馈请关注系统消息！</p>
      <div class="input-wrap">
        <input
          v-model="form.amount"
          type="number"
          placeholder="请至少提取100积分"
          oninput="value = value.slice(0,8)">
      </div>

      <div
        class="m-lim-width"
        style="margin-top: 0.6rem">
        <button
          :disabled="disabled || loading"
          class="m-long-btn m-signin-btn"
          @click="handleOk">
          <v-icon
            v-if="loading"
            type="base-loading"/>
          <span v-else>确定</span>
        </button>
      </div>
    </main>

    <footer>
      <router-link
        to="/currency/rule"
        tag="p">
        <v-icon
          style="vertical-align: bottom;"
          type="wallet-alert-circle"/>
        积分提取规则
      </router-link>
    </footer>

  </div>
</template>

<script>
import bus from "@/bus";

export default {
  name: "CurrencyWithdraw",
  data() {
    return {
      form: {
        amount: ""
      },
      disabled: true,
      loading: false
    };
  },
  methods: {
    handleOk() {},
    selectWithdrawType() {
      const actions = [];
      bus.$emit("actionSheet", actions, "取消", "当前未支持任何提现方式");
    }
  }
};
</script>

<style lang="less" scoped>
@import "./currency.less";

.p-currency-withdraw {
  .m-currency-panel p {
    font-size: 60px;
  }

  .m-entry {
    width: 100%;
    padding: 0 20px;
    background-color: #fff;
  }

  main {
    font-size: 26px;
    padding: 30px;
    line-height: 54px;
    color: #999;

    .input-wrap {
      height: 90px;
      background-color: #f4f5f5;
      border: solid 1px #dedede;
      margin-top: 30px;

      input {
        background-color: transparent;
        height: 100%;
        width: 100%;
        text-align: center;
        font-size: 30px;
      }
    }
  }
}
</style>
