<template lang="html">
  <div class="p-currency">

    <common-header class="header">
      我的积分
      <router-link slot="left" to="/profile">
        <svg class="m-style-svg m-svg-def">
          <use xlink:href="#icon-back" />
        </svg>
      </router-link>
      <router-link
        slot="right"
        to="/currency/journal-detail">
        明细
      </router-link>
    </common-header>

    <section class="m-currency-panel">
      <h3>当前积分</h3>
      <p>{{ user.currency.sum || 0 }}</p>
    </section>

    <ul class="m-box-model m-entry-group padding">
      <router-link
        to="/currency/recharge"
        tag="li"
        class="m-entry">
        <svg class="m-style-svg m-svg-def m-entry-prepend">
          <use xlink:href="#icon-currency-recharge" />
        </svg>
        <span class="m-text-box m-flex-grow1">充值积分</span>
        <svg class="m-style-svg m-svg-def m-entry-append">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </router-link>
      <router-link
        to="/currency/withdraw"
        tag="li"
        class="m-entry">
        <svg class="m-style-svg m-svg-def m-entry-prepend">
          <use xlink:href="#icon-profile-wallet" />
        </svg>
        <span class="m-text-box m-flex-grow1">提取积分</span>
        <svg class="m-style-svg m-svg-def m-entry-append">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </router-link>
    </ul>

    <detail-ad type="currency"/>

    <footer>
      <p @click="showRule">
        <svg class="m-style-svg m-svg-small">
          <use xlink:href="#icon-wallet-warning" />
        </svg>
        积分规则
      </p>
    </footer>

    <popup-dialog
      ref="dialog"
      title="积分规则">
      <p v-html="rule"/>
    </popup-dialog>

  </div>
</template>

<script>
import { mapState } from "vuex";
import PopupDialog from "@/components/PopupDialog.vue";
import DetailAd from "@/components/advertisement/DetailAd.vue";

export default {
  name: "Currency",
  components: { PopupDialog, DetailAd },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: "CURRENTUSER",
      currency: "currency"
    }),
    rule() {
      return this.currency.rule.replace(/\n/g, "<br>");
    }
  },
  mounted() {
    if (!this.currency.recharge.length)
      this.$store.dispatch("currency/getCurrencyInfo");

    const amount = this.$route.query.total_amount;
    if (amount) {
      this.$store.dispatch("fetchUserInfo");
      this.$Message.success(`共消耗${amount}元, 获得 ${amount * 100} 积分!`);
    }
  },
  methods: {
    showRule() {
      this.$refs.dialog.show();
    }
  }
};
</script>

<style lang="less" scoped>
@import "./currency.less";
</style>
