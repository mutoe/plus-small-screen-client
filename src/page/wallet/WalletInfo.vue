<template>
  <div class="p-wallet-info">

    <common-header>账单详情</common-header>

    <main>
      <div class="wallet-info--detail--body">
        <p>交易{{ detail.status ? '成功' : '失败' }}</p>
        <h2>{{ detail.action ? '+' : '-' }}{{ detail.amount | postfix(2) }}</h2>
      </div>
      <div class="wallet-info--detail--content">
        <div class="wallet-info--detail--content-row">
          <span class="wallet-info--detail--content-row--label">
            {{ detail.action ? '收款人' : '付款人' }}
          </span>
          <div>
            <avatar
              :user="user"
              size="small"/>
            {{ user.name }}
          </div>
        </div>
        <div class="wallet-info--detail--content-row">
          <span class="wallet-info--detail--content-row--label m-flex-shrink0">交易说明</span>
          <div>{{ detail.body }}</div>
        </div>
        <div class="wallet-info--detail--content-row">
          <span class="wallet-info--detail--content-row--label">交易时间</span>
          <div>{{ detail.created_at }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "WalletInfoDetail",
  filters: {
    postfix(val, pos) {
      if (!val) return "0.00";
      val.toFix(pos);
    }
  },
  data() {
    return {
      // detail: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    detail() {
      const id = this.$route.params.id;
      return this.$store.getters["wallet/getWalletById"](id);
    },
    user() {
      return this.$store.state.CURRENTUSER;
    }
  },
  mounted() {
    // 如果 store 中没有数据就返回列表抓取数据
    _.isEmpty(this.detail) && this.$router.replace({ path: "/wallet/detail" });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.p-wallet-info {
  main {
    padding-top: 90px;
  }
}
</style>
