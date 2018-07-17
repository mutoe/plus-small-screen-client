import * as api from "@/api/wallet";

const state = {
  list: []
};

const getters = {
  getWalletById: state => id => {
    return state.list.filter(wallet => wallet.id === id);
  }
};

const TYPES = {
  UPDATE_WALLET: "UPDATE_WALLET"
};

const mutations = {
  [TYPES.UPDATE_WALLET]() {}
};

const actions = {
  async getWalletOrders(store, params) {
    const response = await api.getWalletOrders(params);
    return response.data || [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
