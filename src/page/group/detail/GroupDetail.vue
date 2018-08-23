<template>
  <div
    :class="{ 'show-slide': showSlide }"
    class="p-group-detail"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @mousemove.stop="onDrag"
    @touchmove.stop="onDrag"
    @mouseup="stopDrag"
    @touchend="stopDrag"
    @mouseleave="stopDrag">

    <header
      ref="head"
      :class="{ 'show-title': scrollTop > 1 / 2 * bannerHeight }"
      class="m-box m-lim-width m-pos-f m-head-top bg-transp">
      <div class="m-box m-flex-grow1 m-aln-center m-flex-base0">
        <svg class="m-style-svg m-svg-def" @click="goBack">
          <use xlink:href="#base-back"/>
        </svg>
        <svg v-show="updating" class="m-style-svg m-svg-def">
          <use xlink:href="#base-loading"/>
        </svg>
      </div>
      <div class="m-box m-flex-grow1 m-aln-center m-flex-base0 m-justify-center"/>
      <div class="m-box m-flex-grow1 m-aln-center m-flex-base0 m-justify-end">
        <svg class="m-style-svg m-svg-def" @click="onSearchClick">
          <use xlink:href="#base-search"/>
        </svg>
        <svg class="m-style-svg m-svg-def" @click="onMoreClick">
          <use xlink:href="#feed-more"/>
        </svg>
      </div>
    </header>

    <div v-if="loading" class="m-pos-f m-spinner">
      <div/>
      <div/>
    </div>

    <main style="overflow-x: hidden; overflow-y:auto; min-height: 100vh">
      <div
        ref="banner"
        :style="[groupBackGround,paddingTop, {transitionDuration: dragging ? '0s' : '300ms'}]"
        class="p-group-detail-banner">
        <div class="m-box m-aln-end m-justify-st m-pos-f p-group-detail-bg-mask">
          <div class="p-group-detail-avatar">
            <img :src="groupAvatar">
          </div>
          <div class="m-box-model m-flex-grow1 m-flex-shrink1 m-flex-base0">
            <h3>{{ group.name }}</h3>
            <p>
              <span
                append
                to="member"
                tag="span">成员:<i>{{ groupUserCount }}</i></span>
            </p>
            <p>
              <span
                class="m-text-cut address"
                append
                to="followings"
                tag="span">地址:<address>{{ location }}</address></span>
            </p>
          </div>
          <div class="m-box m-aln-center m-flex-grow0 m-flex-shink0 group-item-action c_fff">
            <button
              v-if="!joined"
              :disabled="loading"
              class="m-text-cut"
              @click="beforeJoined">
              <svg :style="loading ? {} : {width: '0.2rem', height:'0.2rem'}" class="m-style-svg m-svg-def">
                <use :xlink:href="`#${loading?'base-loading':'foot-plus'}`" />
              </svg>
              <span>加入</span>
            </button>
          </div>
        </div>
      </div>
      <div class="m-text-box p-group-detail-info">
        <p>圈主：<span>{{ groupOwner.name }}</span></p>
        <p>简介：<span>{{ summary }}</span></p>
      </div>
      <div
        v-clickoutside="hidenFilter"
        class="m-box m-aln-center m-justify-bet p-group-detail-filter-box"
        @click="showFilter = !showFilter">
        <span>帖子数量<em>{{ groupPostsCount }}</em></span>
        <div class="m-box m-aln-center p-group-detail-filter">
          <span>{{ feedTypes[screen] }}</span>
          <svg class="m-style-svg m-svg-def">
            <use xlink:href="#base-filter-list"/>
          </svg>
          <transition v-if="showFilter">
            <ul class="p-group-detail-filter-options">
              <li
                v-for="(val, key) of feedTypes"
                :key="key"
                class="m-box m-aln-center m-justify-bet"
                @click="screen = key">
                <span>{{ val }}</span>
                <svg v-if="screen === key" class="m-style-svg m-svg-def">
                  <use xlink:href="#base-checked"/>
                </svg>
              </li>
            </ul>
          </transition>
        </div>
      </div>
      <ul class="p-group-detail-feeds">
        <li v-for="feed in pinneds" :key="`gdf-${groupId}-pinned-feed-${feed.id}`">
          <group-feed-card :pinned="true" :feed="feed" />
        </li>
        <li v-for="(feed, index) in posts" :key="`gdf-${groupId}-feed-${feed.id}-${index}`">
          <group-feed-card :feed="feed" />
        </li>
      </ul>
      <div class="m-box m-aln-center m-justify-center load-more-box">
        <span v-if="noMoreData" class="load-more-ph">---没有更多---</span>
        <span
          v-else
          class="load-more-btn"
          @click.stop="getFeeds(true)">
          {{ fetchFeeding ? "加载中..." : "点击加载更多" }}
        </span>
      </div>
    </main>

    <aside class="slide-more">
      <ul class="list">
        <li @click="$router.push({ name: 'groupMembers' })">
          <span>
            <svg class="m-icon-svg m-svg-def" fill="#4a4d5e"><use xlink:href="#group-6"/></svg>
            成员
          </span>
          <span>
            {{ group.users_count }}
            <svg class="m-icon-svg m-svg-def" fill="#4a4d5e"><use xlink:href="#base-arrow-r"/></svg>
          </span>
        </li>
        <li @click="$router.push({ name: 'groupInfo' })">
          <span>
            <svg class="m-icon-svg m-svg-def" fill="#4a4d5e"><use xlink:href="#group-5"/></svg>
            详细信息
          </span>
          <span>
            <svg class="m-icon-svg m-svg-def" fill="#4a4d5e"><use xlink:href="#base-arrow-r"/></svg>
          </span>
        </li>
        <li v-if="isOwner" @click="$router.push({name: 'groupPermission'})">
          <span>
            <svg class="m-icon-svg m-svg-def" fill="#4a4d5e"><use xlink:href="#group-4"/></svg>
            发帖权限
          </span>
          <span>
            <svg class="m-icon-svg m-svg-def" fill="#4a4d5e"><use xlink:href="#base-arrow-r"/></svg>
          </span>
        </li>
      </ul>
      <button
        v-if="isOwner"
        class="btn-quit"
        @click="onTransfer">转让圈子</button>
      <button
        v-else
        class="btn-quit"
        @click="onExit">退出圈子</button>
    </aside>
    <div class="slide-mask" @click="showSlide = false"/>

    <button class="create-post" @click="onCreatePostClick">
      <svg class="m-icon-svg m-svg-def">
        <use xlink:href="#foot-plus" fill="#fff"/>
      </svg>
    </button>

  </div>
</template>

<script>
import _ from "lodash";
import bus from "@/bus.js";
import GroupFeedCard from "@/components/FeedCard/GroupFeedCard.vue";

import { joinGroup } from "@/api/group.js";
import { getGroudFeedsByType } from "@/api/group.js";

export default {
  name: "GroupDetail",
  directives: {
    clickoutside: {
      bind(el, binding) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },
  components: {
    GroupFeedCard
  },
  data() {
    return {
      preGID: 0,

      scrollTop: 0,
      bannerHeight: 0,
      loading: true,
      dY: 0,
      startY: 0,
      dragging: !1,
      updating: !1,

      typeFilter: null,
      showFilter: !1,
      screen: "latest_post",

      feedTypes: {
        latest_post: "最新帖子",
        latest_reply: "最新回复"
      },

      noMoreData: false,
      fetchFeeding: false,

      posts: [],
      pinneds: [],
      group: {},
      showSlide: false
    };
  },
  computed: {
    groupId() {
      return this.$route.params.groupId;
    },
    currentUser() {
      return this.$store.state.CURRENTUSER;
    },
    groupOwner() {
      return (this.group.founder || { user: {} }).user;
    },
    groupUserCount() {
      return ~~this.group.users_count;
    },
    groupPostsCount() {
      return ~~this.group.posts_count;
    },
    summary() {
      const summary = this.group.summary || "";
      return summary;
    },
    groupAvatar() {
      return this.group.avatar;
    },
    groupBackGround() {
      return {
        "background-image": this.groupAvatar ? `url("${this.groupAvatar}")` : ""
      };
    },
    location() {
      const location = this.group.location;
      if (location) return location;
      const map = ["水星", "金星", "火星", "土星", "地球"];
      const rand = Math.floor(Math.random() * map.length);
      return map[rand];
    },

    // banner 相关
    paddingTop() {
      return {
        paddingTop:
          ((this.bannerHeight + 80 * Math.atan(this.dY / 200)) /
            (this.bannerHeight * 2)) *
            100 +
          "%"
      };
    },

    joined() {
      return this.group.joined || false;
    },
    role() {
      if (!this.joined) return false;
      return this.joined.role;
    },
    permissions() {
      return this.group.permissions.split(",");
    },
    isOwner() {
      return this.groupOwner.id === this.currentUser.id;
    }
  },
  watch: {
    $route(to, from) {
      if (from.meta.sidebar) this.showSlide = true;
    },
    screen() {
      this.getFeeds();
    }
  },
  created() {
    this.updateData();
  },
  mounted() {
    this.typeFilter = this.$refs.typeFilter;
    this.bannerHeight = this.$refs.banner.getBoundingClientRect().height;
  },
  activated() {
    if (this.preGID !== this.groupId) {
      this.loading = true;
      this.feeds = [];
      this.updateData();
    } else {
      setTimeout(() => {
        this.loading = false;
      }, 300);
    }

    window.addEventListener("scroll", this.onScroll);

    this.preGID = this.groupId;
  },
  deactivated() {
    this.showFilter = false;
    window.removeEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    beforeJoined() {
      if (this.joined || this.loading) return;
      this.loading = true;
      this.mode === "paid" && this.money > 0
        ? bus.$emit("payfor", {
            title: "申请加入圈子",
            confirmText: "支付并加入",
            amount: this.money,
            content: `您只需支付${this.money}积分来加入圈子`,
            onOk: () => {
              joinGroup(this.group.id).then(
                ({ data: { message = "加圈成功" } }) => {
                  this.$Message.success(message);
                  this.group.joined = true;
                  this.loading = false;
                }
              );
            },
            onCancel: () => {
              this.loading = false;
            }
          })
        : joinGroup(this.group.id).then(() => {
            this.loading = false;
            this.group.joined = true;
          });
    },
    hidenFilter() {
      this.showFilter = false;
    },
    getFeeds(more = false) {
      if (this.fetchFeeding) return;
      this.fetchFeeding = true;
      const offset = more ? this.pinneds.length + this.posts.length : 0;
      getGroudFeedsByType(this.groupId, this.screen, 10, offset).then(
        ({ pinneds = [], posts = [] }) => {
          this.posts = more ? [...this.posts, ...posts] : posts;
          this.pinneds = more ? [...this.pinneds, ...pinneds] : pinneds;

          this.fetchFeeding = false;
          this.noMoreData = posts.length < 3;
        }
      );
    },
    updateData() {
      this.dY = 0;
      this.$store
        .dispatch("group/getGroupById", { groupId: this.groupId })
        .then(group => {
          this.group = group;
          this.updating = this.loading = false;
          this.getFeeds();
        })
        .catch(err => {
          this.$Message.error(err.message);
          this.goBack();
        });
    },
    onScroll: _.debounce(function() {
      this.scrollTop = Math.max(
        0,
        document.body.scrollTop,
        document.documentElement.scrollTop
      );
    }, 1000 / 60),
    startDrag(e) {
      e = e.changedTouches ? e.changedTouches[0] : e;
      if (this.scrollTop <= 0 && !this.updating) {
        this.startY = e.pageY;
        this.dragging = true;
      }
    },
    onDrag(e) {
      const $e = e.changedTouches ? e.changedTouches[0] : e;
      if (this.dragging && $e.pageY - this.startY > 0 && window.scrollY <= 0) {
        // 阻止 原生滚动 事件
        e.preventDefault();
        this.dY = $e.pageY - this.startY;
      }
    },
    stopDrag() {
      this.dragging = false;
      this.dY > 300 && this.scrollTop <= 0 ? this.updateData() : (this.dY = 0);
    },
    onSearchClick() {
      this.$router.push({
        name: "groupSearchPost",
        params: { groupId: this.groupId }
      });
    },
    onMoreClick() {
      this.showSlide = !this.showSlide;
    },
    onCreatePostClick() {
      if (!this.joined)
        return bus.$emit("actionSheet", [], "知道了", "需要先加入才可发帖");
      if (!this.permissions.includes(this.role)) {
        const roleText = this.permissions.includes("administrator")
          ? "圈主和管理员"
          : "圈主";
        const text = `${this.group.name}仅${roleText}拥有发帖权限`;
        return bus.$emit("actionSheet", [], "知道了", text);
      }

      this.$router.push({
        name: "groupCreatePost",
        query: { group: this.groupId }
      });
    },
    onExit() {
      const actions = [
        {
          text: "退出圈子",
          method: () => {
            this.exitGroup();
          },
          style: { color: "red" }
        }
      ];
      bus.$emit("actionSheet", actions, "取消", "确定要退出圈子吗?");
    },
    async exitGroup() {
      await this.$store.dispatch("group/exitGroup", { groupId: this.groupId });
      this.$Message.success("退出圈子成功");
      this.$router.replace({ name: "groupHome" });
    },
    onTransfer() {
      this.$router.push({ name: "groupTransfer" });
    }
  }
};
</script>

<style lang="less" scoped>
.p-group-detail {
  position: relative;
  transition: 0.4s;

  > header {
    border-bottom: 0;
    transition: all 0.4s ease;

    &.bg-transp {
      color: #fff;
      background-color: transparent;
    }
    &.show-title {
      background-image: none;
      background-color: #fff;
      border-bottom: 1px solid @border-color; /*no*/
      color: #000;
      .m-trans-y {
        transform: none;
      }
    }
    .m-trans-y {
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }
  }

  .slide-more {
    position: fixed;
    right: -400px;
    top: 0;
    bottom: 0;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #363845;
    color: #ccc;
    transition: 0.4s;
    z-index: 11;
    padding: 40px;

    .list {
      margin-top: 120px;
      border-top: 1px solid #4a4d5e;

      > li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        border-bottom: 1px solid #4a4d5e;
        font-size: 30px;

        svg {
          vertical-align: sub;
        }
      }
    }

    .btn-quit {
      width: 100%;
      border-radius: 8px;
      height: 60px;
      background-color: transparent;
      color: #ccc;
      border: 1px solid #4a4d5e;
      font-size: 30px;
    }
  }
  .slide-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: none;
  }

  &.show-slide {
    margin-left: -400px;
    padding-right: 400px;

    > header {
      margin-left: -400px;
    }

    .slide-more {
      right: 0;
    }
    .slide-mask {
      display: block;
    }
  }

  .address {
    display: inline-block;
    max-width: 20em;
  }

  .create-post {
    position: fixed;
    bottom: 40px;
    height: 60px;
    width: 60px;
    left: 50%;
    padding: 0;
    border-radius: 100%;
    margin-left: -30px;
    background-color: @primary;
    border: 2px solid #fff;
    box-shadow: 0px 0px 12px 0px rgba(89, 182, 215, 0.43);
    z-index: 1;

    > svg {
      display: block;
      margin: auto;
    }
  }
}
.p-group-detail-banner {
  // overflow-x: hidden;
  padding-top: 320/640 * 100%;
  width: 100%;
  transform: translate3d(0, 0, 0);
  background-size: cover;
  background-position: center;
  font-size: 28px;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);

  h3 {
    font-size: 32px;
  }
  p {
    span + span {
      margin-left: 40px;
    }
    i {
      margin: 0 5px;
    }
  }

  .p-group-detail-avatar {
    margin-right: 20px;
    overflow: hidden;
    width: 140px;
    height: 140px;
    border: 2px solid #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  //背景虚化
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    margin: auto;

    filter: blur(15px);
    transform: scale(1.1);
    background: inherit;
  }
}

.p-group-detail-bg-mask {
  padding: 0 25px 50px;
  background-color: rgba(124, 124, 124, 0.2);
}

.p-group-detail-info {
  background-color: #fff;
  padding: 30px 20px;
  font-size: 26px;
  line-height: 36px;
  color: @text-color3;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); /*no*/
  p + p {
    margin-top: 10px;
  }
}

.p-group-detail-tag {
  margin-top: 20px;
  margin-left: 10px;
  display: inline-block;
  padding: 5px 20px;
  font-size: 24px;
  background-color: rgba(102, 102, 102, 0.1);
  border-radius: 18px;
}
.p-group-detail-filter {
  position: relative;
  &-box {
    padding: 25px 20px;
    color: @text-color3;
    font-size: 26px;
    position: sticky;
    top: 88px;
    z-index: 9;
    background-color: #f4f5f6;
    .m-style-svg {
      margin-left: 20px;
    }
  }
  &-options {
    overflow: hidden;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 9;
    min-width: 200px;
    border-radius: 8px;
    background-color: #fff;
    transform: translate3d(0, 25px, 0);
    box-shadow: 0 0 10px 0 rgba(221, 221, 221, 0.6); /*no*/
    li {
      padding: 25px 20px;
      font-size: 24px;
      color: @text-color3;
      & + li {
        border-top: 1px solid @border-color; /*no*/
      }
    }
  }
}

.p-group-detail-feeds {
  li + li {
    margin-top: 10px;
  }
}

.group-item-action {
  margin-bottom: 80px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 126px;
    height: 50px;

    border: 1px solid currentColor; /*no*/
    border-radius: 8px;
    background-color: #fff;

    font-size: 24px;
    color: @primary;
    transition: all 0.3s ease;
    span {
      transition: all 0.3s ease;
      margin-left: 5px;
    }
    &[disabled] {
      color: @border-color;
      cursor: not-allowed;
      span {
        color: @text-color3;
      }
      svg {
        opacity: 0.5;
      }
    }
  }

  &.c_fff {
    button {
      background-color: transparent;
      color: #fff;
    }
  }
}
</style>
