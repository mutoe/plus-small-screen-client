/**
 * 钱包模块
 */
const wallet = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/wallet");
const WalletRecharge = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/WalletRecharge");
const WalletWithdraw = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/WalletWithdraw");
const WalletDetail = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/wallet/WalletDetail");

export default [
  {
    path: "/wallet",
    component: wallet,
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
