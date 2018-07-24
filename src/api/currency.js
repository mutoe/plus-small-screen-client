import api from "./api.js";

/**
 * 获取积分配置信息
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @returns
 */
export function getCurrencyInfo() {
  return api.get("/currency", { validateStatus: s => s === 200 });
}

/**
 * 获取积分流水
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Object} params
 * @param {number} [params.limit]
 * @param {number} [params.after]
 * @param {string} [params.action] - 筛选类型 [recharge: 充值记录, cash: 提现记录] 默认为全部
 * @param {number} [params.type] 收入类型 [1: 收入, -1: 支出] 默认为全部
 * @returns
 */
export function getCurrencyOrders(params) {
  return api.get("/currency/orders", {
    params,
    validateStatus: s => s === 200
  });
}

/**
 * 发起充值
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Object} data
 * @param {string} data.type 充值方式
 * @param {number} data.amount 充值金额(单位：RMB分)
 * @param {Object|Array} [data.extra] 拓展信息字段
 * @returns
 */
export function postCurrencyRecharge(data) {
  return api.post("/currency/recharge", data, {
    validateStatus: s => s === 201
  });
}