import api from "./api.js";

/**
 * 获取钱包流水
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Object} params
 * @param {number} [params.limit]
 * @param {number} [params.after] 最后一条流水的 id
 * @param {string} [params.action] (income: 收入|expenses: 支出)
 * @returns
 */
export function getWalletOrders(params) {
  return api.get("/plus-pay/orders", {
    params,
    validateStatus: s => s === 200
  });
}
