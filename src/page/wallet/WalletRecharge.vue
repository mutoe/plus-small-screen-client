<template>
  <div class="m-box-model p-wallet-recharge m-pos-f">
    <header class="m-box m-justify-bet m-aln-center m-bb1 m-head-top m-main m-lim-width">
      <div class="m-box m-flex-grow1 m-aln-center m-flex-base0">
        <svg
          class="m-style-svg m-svg-def"
          @click="goBack">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#base-back"/>
        </svg>
      </div>
      <div class="m-box-model m-flex-grow1 m-aln-center m-flex-base0 m-head-top-title">
        <span>充值</span>
      </div>
      <div class="m-box m-flex-grow1 m-aln-center m-flex-base0 m-justify-end"/>
    </header>
    <main class="m-box-model m-aln-center m-justify-center">
      <div class="m-box-model m-lim-width m-main">
        <div class="m-pinned-amount-btns">
          <p class="m-pinned-amount-label">选择充值金额</p>
          <div class="m-box m-aln-center ">
            <button
              v-for="item in items"
              :key="item"
              :style="{ width: `${1 / items.length * 100}%` }"
              :class="{ active: ~~amount === ~~item && !customAmount }"
              class="m-pinned-amount-btn"
              @click="chooseDefaultAmount(item)">{{ ~~item }}</button>
          </div>
        </div>
        <div class="m-box m-aln-center m-justify-bet m-bb1 m-bt1 m-pinned-row plr20 m-pinned-amount-customize">
          <span>自定义金额</span>
          <div class="m-box m-aln-center">
            <input
              v-model.number="customAmount"
              type="number"
              class="m-text-r"
              pattern="[0-9]*"
              placeholder="输入金额"
              oninput="value=value.slice(0,8)">
            <span>元</span>
          </div>
        </div>
      </div>

      <div
        class="m-entry"
        @click="selectRechargeType">
        <span class="m-text-box m-flex-grow1">选择充值方式</span>
        <svg class="m-style-svg m-svg-def m-entry-append">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#base-arrow-r"/>
        </svg>
      </div>

      <div
        class="plr20 m-lim-width"
        style="margin-top: 0.6rem">
        <button
          :disabled="disabled || loading"
          class="m-long-btn m-signin-btn"
          @click="handleOk">
          <svg
            v-if="loading"
            class="m-style-svg m-svg-def">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#base-loading"/>
          </svg>
          <span v-else>确定</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import bus from "@/bus";

export default {
  name: "WalletRecharge",
  data() {
    return {
      items: [10, 50, 100],
      customAmount: null,
      amount: 0,
      disabled: true,
      loading: false
    };
  },
  methods: {
    chooseDefaultAmount(amount) {
      this.customAmount && (this.customAmount = null);
      this.amount = amount;
    },
    selectRechargeType() {
      const actions = [];
      bus.$emit("actionSheet", actions, "取消", "当前未支持任何充值方式");
    },
    handleOk() {}
  }
};
</script>

<style lang="less" scoped>
.m-entry {
  width: 100%;
  padding: 0 20px;
  background-color: #fff;
  margin-top: 20px;
}
</style>
