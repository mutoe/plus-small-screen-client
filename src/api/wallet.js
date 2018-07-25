import api from "./api.js";

/**
 * 获取钱包配置信息
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @returns
 */
export function getWalletInfo() {
  return api.get("/wallet", { validateStatus: s => s === 200 });
}

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

/**
 * 转换为积分
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Object} data
 * @param {number} data.amount
 * @returns
 */
export function postTransform(data) {
  return api.post("/plus-pay/transform", data, {
    validateStatus: s => s === 201
  });
}

/**
 * 发起提现请求
 * @author mutoe <mutoe@foxmail.com>
 * @export
 * @param {Object} data
 * @param {string} data.type 充值方式
 * @param {number} data.amount 充值金额(单位：RMB分)
 * @param {number} data.from 来自哪个端 h5固定为2
 * @returns
 */
export function postWalletRecharge(data) {
  return api.post(
    "/walletRecharge/orders",
    { ...data, from: 2 },
    { validateStatus: s => s === 201 }
  );
}
