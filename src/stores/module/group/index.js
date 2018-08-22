import actions from "./actions";

export const TYPES = {
  SAVE_GROUP: "SAVE_GROUP"
};

const state = {
  current: {}, // 当前查看的圈子
  protocol: ""
};

const getters = {};

const mutations = {
  [TYPES.SAVE_GROUP](state, group) {
    state.current = group;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
