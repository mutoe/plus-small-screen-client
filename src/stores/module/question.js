import * as answerApi from "@/api/question/answer";
import Message from "@/plugins/message";

const actions = {
  async postAnswer(state, payload) {
    const { questionId, content } = payload;
    const { data } = await answerApi
      .postAnswer(questionId, {
        body: content,
        text_body: content
      })
      .catch(({ response }) => {
        const { errors } = response.data;
        Message.error(errors);
      });
    return data;
  }
};

export default {
  namespaced: true,
  actions
};
