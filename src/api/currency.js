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
