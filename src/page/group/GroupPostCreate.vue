<template>
  <div class="p-group-post-create">

    <common-header>
      发帖
      <span
        slot="right"
        :class="{ disabled }"
        class="primary"
        @click="onSubmit">发布</span>
    </common-header>

    <form-select-item
      v-if="!groupID"
      v-model="group.name"
      label="选择圈子"
      @click="selectGroup" />

    <main>
      <div class="title-wrap">
        <input
          v-model="title"
          type="text"
          placeholder="输入标题，20字以内"
          maxlength="20">
      </div>

      <hr>

      <div class="content-wrap">
        <div class="textarea-shadow">{{ content }}</div> <!-- 用于撑起文本框自适应高度 -->
        <textarea
          v-model="content"
          placeholder="输入要说的话"
          rows="1"/>
      </div>
    </main>

    <choose-group
      v-if="!groupID"
      ref="chooseGroup"
      @change="onGroupChange"/>

  </div>
</template>

<script>
import ChooseGroup from "./components/ChooseGroup.vue";

export default {
  name: "GroupPostCreate",
  components: {
    ChooseGroup
  },
  data() {
    return {
      title: "",
      content: "",
      group: {}
    };
  },
  computed: {
    groupID() {
      return this.$route.query.group;
    },
    disabled() {
      if (!this.groupID && !this.group.id) return true;
      return !this.title || !this.content;
    }
  },
  methods: {
    async onSubmit() {
      const params = {
        groupId: this.groupID || this.group.id,
        title: this.title,
        body: this.content,
        summary: this.content
      };
      const data = await this.$store.dispatch("group/createPost", params);
      if (data) {
        this.$Message.success(data.message);
        this.$router.replace({
          name: "groupPostDetail",
          params: { groupID: data.post.group_id, postID: data.post.id }
        });
      }
    },

    selectGroup() {
      this.$refs.chooseGroup.show();
    },
    onGroupChange(group) {
      this.group = group;
    }
  }
};
</script>

<style lang="less">
.p-group-post-create {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;

  .primary {
    color: @primary;
  }

  .disabled {
    color: #ccc;
  }

  > main {
    padding: 30px;

    > hr {
      border-bottom: 1px solid @border-color;
    }

    .content-wrap {
      position: relative;
      width: 100%;
      height: calc(~"100% + 40px");
      padding-right: 20px;

      .textarea-shadow {
        opacity: 0;
        min-height: 100px;
        padding: 28px 0;
        word-wrap: break-word;
        word-break: break-all;
      }

      textarea {
        position: absolute;
        top: 0;
        display: block;
        font-size: 30px;
        // padding: 28px 0;
        width: calc(~"100% - 20px");
        height: 100%;
        overflow: hidden;
        resize: none;
        outline: none;
        min-height: 100px;
        background-color: transparent;
        word-wrap: break-word;
        word-break: break-all;
      }
    }

    input,
    textarea {
      width: 100%;
      height: 100%;
      font-size: 30px;
    }
  }
}
</style>
