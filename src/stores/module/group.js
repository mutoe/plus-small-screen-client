import * as api from "@/api/group";

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
    const { category, formData } = payload;
    const { data } = await api.postGroup(category, formData);
    return data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
