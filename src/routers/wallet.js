/**
 * 钱包模块
 */
const Wallet = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/Wallet.vue");
const WalletRecharge = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/WalletRecharge.vue");
const WalletWithdraw = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/WalletWithdraw.vue");
const WalletDetail = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/WalletDetail.vue");

export default [
  {
    path: "/wallet",
    component: Wallet,
    meta: {
      title: "钱包",
      requiresAuth: true
    }
  },
  {
    path: "/wallet/recharge",
    component: WalletRecharge,
    meta: {
      title: "充值"
    }
  },
  {
    path: "/wallet/withdraw",
    component: WalletWithdraw,
    meta: {
      title: "提现"
    }
  },
  {
    path: "/wallet/detail",
    component: WalletDetail,
    meta: {
      title: "明细"
    }
  }
];
