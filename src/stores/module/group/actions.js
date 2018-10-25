import * as api from "@/api/group";

export default {
  /**
   * 获取我加入的圈子
   * @author mutoe <mutoe@foxmail.com>
   * @returns {api.GroupObject[]}
   */
  async getMyGroups(store, payload) {
    const { data } = await api.getMyGroups(payload);
    return data;
  },

  /**
   * 获取圈子
   * @author mutoe <mutoe@foxmail.com>
   * @returns
   */
  async getGroups(store, payload) {
    const { type, limit, offset = 0 } = payload;

    const { data } = ["recommend", "random"].includes(type)
      ? await api.getRecommendGroups({
          type: type === "random" ? "random" : undefined,
          limit,
          offset
        })
      : [];
    return data;
  }
};
