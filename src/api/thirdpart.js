import api from "./api";

export function alipay(params) {
  console.log(1);
  return api.get(`https://openapi.alipay.com/gateway.do?${params}`);
}
