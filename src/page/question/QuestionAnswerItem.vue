<template>
  <div class="p-question-answer-item" @click="viewDetail">
    <div class="main">
      <div class="avatar" @click.stop="viewUser">
        <user-avatar
          :size="0.56"
          :anonymity="anonymity"
          :src="user.avatar"
          :sex="user.sex" />
      </div>
      <div class="info">
        <h3 class="main-header">
          <span @click.stop="viewUser">{{ anonymity ? '匿名用户' : user.name }}</span>
          <span class="time">{{ answer.created_at | time2tips }}</span>
        </h3>
        <div class="main-body">{{ answer.body | markdownText }}</div>
      </div>
    </div>
    <div class="main-button">
      <span @click.stop="handleLikeTarget">
        <svg class="icon">
          <use :xlink:href="answer.liked ? '#feed-like' : '#feed-unlike'" />
        </svg>
        {{ answer.likes_count | formatNum }}
      </span>
      <span>
        <svg class="icon">
          <use xlink:href="#message-comments" />
        </svg>
        {{ answer.comments_count | formatNum }}
      </span>
    </div>
  </div>
</template>

<script>
import UserAvatar from "./components/UserAvatar.vue";
import { like, unlike } from "@/api/question/answer";

export default {
  name: "QuestionAnswerItem",
  components: {
    UserAvatar
  },
  props: {
    answer: { type: Object, required: true }
  },
  data: () => ({
    likeTargetHanding: false
  }),
  computed: {
    anonymity() {
      const { anonymity } = this.answer;
      return !!anonymity;
    },
    user() {
      const { user = {} } = this.answer;
      return user;
    }
  },
  methods: {
    handleLike() {
      like(this.answer.id)
        .then(() => {
          this.likeTargetHanding = false;
          this.answer.liked = true;
          this.answer.likes_count += 1;
        })
        .catch(({ response: { data } = {} }) => {
          this.likeTargetHanding = false;
          this.$Message.error(data);
        });
    },
    handleUnlike() {
      unlike(this.answer.id)
        .then(() => {
          this.likeTargetHanding = false;
          this.answer.liked = false;
          this.answer.likes_count -= 1;
        })
        .catch(({ response: { data } = {} }) => {
          this.likeTargetHanding = false;
          this.$Message.error(data);
        });
    },
    handleLikeTarget() {
      if (this.likeTargetHanding) {
        this.$Message.warning("正在执行，请勿重复点击!");
        return;
      } else if (this.answer.liked) {
        this.handleUnlike();
        return;
      }
      this.handleLike();
    },
    viewDetail() {
      this.$router.push(
        `/questions/${this.answer.question_id}/answers/${this.answer.id}`
      );
    },
    viewUser() {
      if (!this.user.id) return;
      this.$router.push(`/users/${this.user.id}`);
    }
  }
};
</script>

<style lang="less" scoped>
@avatar-size: 112px;

.p-question-answer-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  margin-bottom: 9px;

  .main {
    display: flex;
    width: 100%;
    padding: 30px 30px 20px 0;

    .avatar {
      width: @avatar-size;
      min-width: @avatar-size;
      max-width: @avatar-size;
      flex: none;
      text-align: center;
    }

    .info {
      display: flex;
      flex-direction: column;
      width: 100%;

      .main-header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 26px;
        font-weight: normal;
        font-stretch: normal;
        color: #333;
        margin-top: 0;
        margin-bottom: 29px;

        .time {
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          color: #ccc;
        }
      }

      .main-body {
        text-align: initial;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        font-size: 28px;
        font-weight: normal;
        font-stretch: normal;
        color: #666;
        margin-bottom: 28px;
        line-height: 1.4;
      }
    }
  }

  .main-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-top: solid 1px #ededed;
    padding: 30px;
    padding-left: @avatar-size + 30px;

    > * {
      margin-right: 60px;
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      color: #b3b3b3;

      .icon {
        margin-right: 4px;
        width: 30px;
        height: 30px;
        margin-bottom: -6px;
        fill: #999;

        &.active {
          fill: red;
        }
      }
    }
  }
}
</style>
