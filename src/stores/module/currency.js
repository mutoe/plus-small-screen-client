import * as api from "@/api/currency";

const state = {
  list: [], // 充值纪录
  items: [], // 充值建议金额
  ratio: 100, // 充值比率
  type: [], // 充值类型
  rule: "" // 充值提现规则
};

const getters = {
  rechargeItems: state => {
    return state.items.map(item => item / state.ratio);
  }
};

const TYPES = {
  UPDATE_CURRENCY: "UPDATE_CURRENCY"
};

const mutations = {
  [TYPES.UPDATE_CURRENCY](state, payload) {
    Object.assign(state, payload);
  }
};

const actions = {
  async getCurrencyInfo({ commit }) {
    let { data } = await api.getCurrencyInfo();
    commit(TYPES.UPDATE_CURRENCY, data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
