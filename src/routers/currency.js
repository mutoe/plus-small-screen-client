/**
 * 积分模块 (和 wallet 使用一致的模块合并到打包)
 */
const Currency = () =>
  import(/* webpackChunkName: 'wallet' */ "@/page/currency/Currency.vue");

export default [
  {
    path: "/currency",
    component: Currency,
    meta: {
      title: "钱包",
      requiresAuth: true
    }
  }
];
