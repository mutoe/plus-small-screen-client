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
   * 退出圈子
   * @author mutoe <mutoe@foxmail.com>
   * @returns
   */
  async exitGroup(store, payload) {
    const { groupId } = payload;
    await api.exitGroup(groupId);
    return true;
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
  },

  /**
   * 更改发帖权限
   * @author mutoe <mutoe@foxmail.com>
   * @returns
   */
  async changePermissions(store, payload) {
    const { permissions, groupId } = payload;
    await api.changePermissions(groupId, { permissions });
    return true;
  },

  /**
   * 加入圈子
   * @author mutoe <mutoe@foxmail.com>
   * @returns
   */
  async joinGroup(store, payload) {
    const { groupId, needPaid = false } = payload;
    const { data } = needPaid
      ? await api.joinGroupWithPaid(groupId)
      : await api.joinGroup(groupId);
    return data;
  },

  // 获取圈子分类数据
  async getGroupTypes({ commit }) {
    const { data = [] } = await api.getGroupCates();
    commit(TYPES.SAVE_GROUP_CATES, data);
    return data;
  },

  /**
   * 获取圈子
   * @author mutoe <mutoe@foxmail.com>
   * @param {*} store
   * @param {*} payload
   * @returns
   */
  async getGroups(store, payload) {
    const { type, limit, offset = 0, categoryId } = payload;

    const { data } = ["recommend", "random"].includes(type)
      ? await api.getRecommendGroups({
          type: type === "random" ? "random" : undefined,
          limit,
          offset
        })
      : await api.getGroups({ category_id: categoryId, limit, offset });
    return data;
  }
};
