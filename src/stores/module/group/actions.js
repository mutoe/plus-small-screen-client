import * as api from "@/api/group";
import { TYPES } from "./index";

export default {
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
  },

  /**
   * 根据关键字搜索帖子
   * @author mutoe <mutoe@foxmail.com>
   * @param {Object} payload
   * @returns {api.GroupPostObject[]}
   */
  async searchPosts(store, payload) {
    const { data } = await api.searchPosts(payload);
    return data;
  },

  /**
   * 根据关键字搜索圈子
   * @author mutoe <mutoe@foxmail.com>
   * @param {Object} payload
   * @returns {api.GroupObject[]}
   */
  async searchGroups(store, payload) {
    const { data } = await api.searchGroups(payload);
    return data;
  },

  /**
   * 发帖
   * @author mutoe <mutoe@foxmail.com>
   * @returns {api.GroupPostObject}
   */
  async createPost(store, payload) {
    const { groupId, ...params } = payload;
    const { data } = await api.createGroupPost(groupId, params);
    return data;
  },

  /**
   * 获取我加入的圈子
   * @author mutoe <mutoe@foxmail.com>
   * @returns {api.GroupObject[]}
   */
  async getMyGroups() {
    const { data } = await api.getMyGroups();
    return data;
  },

  /**
   * 获取圈子协议
   * @author mutoe <mutoe@foxmail.com>
   * @returns {string}
   */
  async getProtocol({ state }) {
    const { data } = await api.getProtocol();
    state.protocol = data.protocol;
    return data.protocol || "";
  },

  /**
   * 获取圈子成员
   * @author mutoe <mutoe@foxmail.com>
   * @returns {api.GroupMemberObject}
   */
  async getMembers(store, payload) {
    const { groupId, ...params } = payload;
    const { data } = await api.getMembers(groupId, params);
    return data;
  },

  /**
   * 获取圈子详情
   * @author mutoe <mutoe@foxmail.com>
   * @param {*} payload
   * @returns {api.GroupObject}
   */
  async getGroupById({ commit }, payload) {
    const { groupId } = payload;
    const { data } = await api.getGroupInfoById(groupId);
    commit(TYPES.SAVE_GROUP, data);
    return data;
  },

  /**
   * 转让圈子
   * @author mutoe <mutoe@foxmail.com>
   * @returns {Promise<string>} message
   */
  async transferGroup(store, payload) {
    const { target, groupId } = payload;
    const { data } = await api.transferGroup(groupId, { target });
    return data;
  }
};
