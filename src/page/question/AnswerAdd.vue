<template>
  <div class="p-answer-add">
    <common-header class="header">
      添加回答
      <span slot="right" @click="onPublish">发布</span>
    </common-header>

    <main>
      <textarea v-model="content" placeholder="请输入你的回答"/>
    </main>
  </div>
</template>

<script>
export default {
  name: "AnswerAdd",
  data() {
    return {
      content: ""
    };
  },
  computed: {
    questionId() {
      return this.$route.params.questionId || 0;
    }
  },
  methods: {
    onPublish() {}
  }
};
</script>

<style lang="less" scoped>
.p-answer-add {
  display: flex;
  flex-direction: column;
  height: 100%;

  > main {
    flex: auto;
    background-color: #fff;

    textarea {
      padding: 20px;
      font-size: 30px;
    }
  }
}
</style>
