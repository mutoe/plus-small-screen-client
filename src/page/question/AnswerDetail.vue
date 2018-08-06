<template>
  <article-card
    v-if="answer.id"
    :liked="liked"
    :loading="loading"
    @on-like="likeAnswer"
    @on-share="shareAnswer"
    @on-more="moreAction"
    @on-comment="commentAnswer">

    <header
      slot="head"
      class="m-box m-justify-bet m-aln-center m-art-head m-main"
      style="padding: 0">
      <div class="m-box m-flex-grow1 m-aln-center m-flex-base0">
        <svg class="m-style-svg m-svg-def" @click="goBack">
          <use xlink:href="#base-back"/>
        </svg>
      </div>
      <div class="m-box m-flex-grow2 m-flex-shrink2 m-aln-center m-flex-base0 m-head-top-title m-justify-center">
        <span class="m-text-cut">{{ answer.question.subject }}</span>
      </div>
      <div class="m-box m-flex-grow1 m-aln-center m-flex-base0 m-justify-end"/>
    </header>

    <main class="m-flex-shrink1 m-flex-grow1 m-art m-main">
      <!-- 回答者信息 -->
      <!--<div class="m-box user-info-wrap">
        <avatar :user="user" />
        <div class="m-box-model m-aln-st m-flex-grow1 m-flex-shrink1 user-info">
          <h2 class="m-text-cut">{{ user.name }}</h2>
          <p class="m-text-cut">{{ user.bio || "这家伙很懒,什么也没留下" }}</p>
        </div>
        <button></button>
      </div> -->
      <div class="m-art-body">
        <p class="m-text-box" v-html="formatBody(content)"/>
      </div>
      <div class="m-box m-aln-center m-justify-bet m-art-foot">
        <div class="m-flex-grow1 m-flex-shrink1 m-box m-aln-center m-art-like-list">
          <template v-if="likeCount > 0">
            <ul class="m-box m-flex-grow0 m-flex-shrink0">
              <li
                v-for="({user = {}, id}, index) in likes.slice(0, 5)"
                :key="id"
                :style="{ zIndex: 5-index }"
                :class="`m-avatar-box-${user.sex}`"
                class="m-avatar-box tiny">
                <img :src="user.avatar">
              </li>
            </ul>
            <span>{{ likeCount | formatNum }}人点赞</span>
          </template>
        </div>
        <div class="m-box-model m-aln-end m-art-info">
          <span>发布于{{ time | time2tips }}</span>
          <span>{{ viewsCount | formatNum }}浏览</span>
        </div>
      </div>
      <div class="m-box-model m-box-center m-box-center-a m-art-reward">
        <button class="m-art-rew-btn" @click="rewardAnswer">打 赏</button>
        <p class="m-art-rew-label">
          <a href="javascript:;">{{ reward.count | formatNum }}</a>人打赏，共
          <a href="javascript:;">{{ ~~reward.amount }}</a>积分
        </p>
        <router-link
          tag="ul"
          to="rewarders"
          append
          class="m-box m-aln-center m-art-rew-list">
          <li
            v-for="rew in rewardList"
            :key="rew.id"
            :class="`m-avatar-box-${rew.user.sex}`"
            class="m-flex-grow0 m-flex-shrink0 m-art-rew m-avatar-box tiny">
            <img :src="rew.user.avatar">
          </li>
          <li v-if="rewardList.length > 0" class="m-box m-aln-center">
            <svg class="m-style-svg m-svg-def" style="fill:#bfbfbf">
              <use xlink:href="#base-arrow-r"/>
            </svg>
          </li>
        </router-link>
      </div>
    </main>
    <!-- 评论列表 -->
    <div id="comment_list" class="m-box-model m-art-comments">
      <ul class="m-box m-aln-center m-art-comments-tabs">
        <li>{{ commentCount | formatNum }}条评论</li>
      </ul>
      <comment-item
        v-for="(comment) in pinnedCom"
        :pinned="true"
        :key="`pinned-comment-${comment.id}`"
        :comment="comment"
        @click="replyComment" />
      <comment-item
        v-for="(comment) in comments"
        :key="comment.id"
        :comment="comment"
        @click="replyComment" />
      <div class="m-box m-aln-center m-justify-center load-more-box">
        <span v-if="noMoreCom" class="load-more-ph">---没有更多---</span>
        <span
          v-else
          class="load-more-btn"
          @click.stop="fetchAnswerComments(maxComId)">
          {{ fetchComing ? "加载中..." : "点击加载更多" }}
        </span>
      </div>
    </div>
  </article-card>
</template>

<script>
import bus from "@/bus.js";
import { mapState } from "vuex";
import markdownIt from "markdown-it";
import plusImagePlugin from "markdown-it-plus-image";
import ArticleCard from "@/page/article/ArticleCard.vue";
import CommentItem from "@/page/article/ArticleComment.vue";
import * as api from "@/api/question/answer";

export default {
  name: "AnswerDetail",
  components: {
    ArticleCard,
    CommentItem
  },
  data() {
    return {
      loading: false,
      fetching: false,

      answer: {},

      comments: [],
      pinnedCom: [],
      rewardList: [],
      reward: {
        count: 0,
        amount: 0
      },

      fetchComing: false,
      noMoreCom: false,
      maxComId: 0
    };
  },
  computed: {
    ...mapState(["CURRENTUSER"]),
    questionId() {
      return this.$route.params.questionId;
    },
    answerId() {
      return this.$route.params.answerId;
    },
    user() {
      return this.answer.user;
    },
    time() {
      return this.answer.created_at || "";
    },
    liked: {
      get() {
        return !!this.answer.liked;
      },
      set(val) {
        this.answer.liked = val;
      }
    },
    likes() {
      return this.answer.likes || [];
    },
    likeCount: {
      get() {
        return this.answer.likes_count || 0;
      },
      set(val) {
        this.answer.likes_count = ~~val;
      }
    },
    viewsCount() {
      return this.answer.views_count || 0;
    },
    commentCount: {
      get() {
        return this.answer.comments_count || 0;
      },
      set(val) {
        val > 0, (this.answer.comments_count = ~~val);
      }
    },
    content() {
      const { body = "" } = this.answer;
      return body;
    }
  },
  created() {
    this.fetchAnswer();
  },
  methods: {
    formatBody(body) {
      return markdownIt({
        html: true
      })
        .use(plusImagePlugin, `${this.$http.defaults.baseURL}/files/`)
        .render(body);
    },
    likeAnswer() {
      if (this.fetching) return;
      this.fetching = true;
      api
        .likeAnswersByStatus(this.answerId, this.liked)
        .then(() => {
          !this.liked
            ? ((this.liked = true),
              (this.likeCount += 1),
              this.answer.likes.length < 5 &&
                (this.answer.likes = [
                  ...this.answer.likes,
                  {
                    user: this.CURRENTUSER,
                    id: +new Date(),
                    user_id: this.CURRENTUSER.id
                  }
                ]))
            : ((this.liked = false),
              (this.likeCount -= 1),
              (this.answer.likes = this.answer.likes.filter(like => {
                return like.user_id !== this.CURRENTUSER.id;
              })));

          this.fetching = false;
        })
        .catch(() => {
          this.fetching = false;
        });
    },
    isWechat() {
      return this.$store.state.BROWSER.isWechat;
    },
    shareAnswer() {
      if (this.isWechat) this.$Message.success("请点击右上角微信分享😳");
      else this.$Message.success("请使用浏览器的分享功能😳");
    },
    commentAnswer() {
      bus.$emit("commentInput", {
        onOk: text => {
          this.sendComment({ body: text });
        }
      });
    },
    rewardAnswer() {
      const callback = amount => {
        this.fetchRewards();
        this.reward.count += 1;
        this.reward.amount += amount;
      };
      bus.$emit("reward", {
        type: "answer",
        api: api.rewardAnswer,
        payload: this.answerId,
        callback
      });
    },
    moreAction() {},
    fetchRewards() {
      api.getRewards(this.answerId, { limit: 10 }).then(({ data }) => {
        this.rewardList = data;
      });
    },
    fetchAnswer() {
      if (this.loading) return;
      this.loading = true;

      api.getAnswer(this.answerId).then(({ data }) => {
        this.answer = data;
        this.reward.count = data.rewarder_count;
        this.reward.amount = data.rewards_amount;
        this.rewardList = data.rewarders;
        this.fetchAnswerComments();
        this.loading = false;
      });
    },
    fetchAnswerComments(after = 0) {
      // /question-answers/:answer/comments
      if (this.fetchComing) return;
      this.fetchComing = true;
      this.$http
        .get(`/question-answers/${this.answerId}/comments`, {
          params: {
            limit: 15,
            after
          }
        })
        .then(({ data: comments = [] }) => {
          if (comments && comments.length) {
            (this.comments = after
              ? [...this.comments, ...comments]
              : comments),
              (this.maxComId = comments[comments.length - 1].id);
          }
          this.noMoreCom = comments.length < 15;
          this.$nextTick(() => {
            this.fetchComing = false;
            this.loading = false;
          });
        })
        .catch(e => {
          console.warn(e);
          this.loading = false;
          this.fetchComing = false;
        });
    },
    replyComment(uid, uname) {
      uid === this.CURRENTUSER.id
        ? bus.$emit(
            "actionSheet",
            [
              {
                text: "删除评论",
                method: () => {
                  this.$Message.info("评论删除功能开发中，敬请期待");
                }
              }
            ],
            "取消"
          )
        : bus.$emit("commentInput", {
            placeholder: `回复： ${uname}`,
            onOk: text => {
              this.sendComment({ reply_user: uid, body: text });
            }
          });
    },
    sendComment({ reply_user: replyUser, body }) {
      // 评论答案
      // POST /question-answers/:answer/comments
      const params = {};
      if (body && body.length > 0) {
        params.body = body;
        replyUser && (params["reply_user"] = replyUser);
        this.$http
          .post(`/question-answers/${this.answerId}/comments`, params, {
            validateStatus: s => s === 201
          })
          .then(({ data: { comment } = { comment: {} } }) => {
            this.$Message.success("评论成功");
            this.comments.unshift(comment);
            this.commentCount += 1;
            bus.$emit("commentInput:close", true);
          })
          .catch(() => {
            this.$Message.error("评论失败");
            bus.$emit("commentInput:close", true);
          });
      } else {
        this.$Message.error("评论内容不能为空");
      }
    }
  }
};
</script>
