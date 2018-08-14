import * as answerApi from "@/api/question/answer";

const actions = {
  async postAnswer(state, payload) {
    const { questionId, content, anonymity = 0 } = payload;
    const { data } = await answerApi.postAnswer(questionId, {
      body: content,
      text_body: content,
      anonymity
    });

    return data;
  }
};

export default {
  namespaced: true,
  actions
};
