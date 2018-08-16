import * as api from "@/api/group";
import lstore from "@/plugins/lstore/lstore";

export const TYPES = {};

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /**
   * 创建圈子
   * @author mutoe <mutoe@foxmail.com>
   * @param {*} payload
   * @returns
   */
  async createGroup(store, payload) {
    const { category, ...params } = payload;
    await api.postGroup(category, params);
    return true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
