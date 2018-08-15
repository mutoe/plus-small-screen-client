<template>
  <div class="p-group-home">

    <common-header>
      圈子
      <template slot="right">
        <svg class="m-style-svg m-svg-def">
          <use xlink:href="#base-search"/>
        </svg>
        <svg class="m-style-svg m-svg-def">
          <use xlink:href="#group-add"/>
        </svg>
      </template>
    </common-header>

    <main>

      <!-- 圈子首页顶部广告位 -->
      <detail-ad type="group:home"/>

      <div class="group-label" @click="$router.push({ name: 'groups', query: { type: 'recommend' } })">
        <h2><strong>{{ groupTotalNumber }}</strong>个兴趣小组，等待你的加入！</h2>
        <svg class="m-style-svg m-svg-def m-entry-append">
          <use xlink:href="#base-arrow-r"/>
        </svg>
      </div>
      <!-- 我加入的 -->
      <div class="m-box-model">
        <router-link
          :to="`/users/${currentUserID}/group`"
          tag="div"
          class="group-label">
          <span>我加入的</span>
          <div class="m-box m-aln-center m-justify-end">
            <span>查看全部</span>
            <svg class="m-style-svg m-svg-def m-entry-append">
              <use xlink:href="#base-arrow-r"/>
            </svg>
          </div>
        </router-link>

        <ul class="group-list">
          <li
            v-for="group in groups"
            :key="`mygroup-${group.id}`">
            <group-item :group="group" />
          </li>
        </ul>
      </div>

      <!-- 推荐圈子 -->
      <div
        v-if="recGroups.length > 0"
        class="m-box-model">
        <div class="group-label">
          <span>热门推荐</span>
          <div
            class="m-box m-aln-center m-justify-end"
            @click="fetchRecGroups">
            <svg
              :style="{ transform: `rotate(${clickCount}turn)` }"
              class="m-style-svg m-svg-small">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#base-refresh"/>
            </svg>
            <span style="margin-left: 0.05rem">换一批</span>
          </div>
        </div>
        <ul class="group-list">
          <li v-for="group in recGroups" :key="`recgroup-${group.id}`">
            <group-item :group="group" />
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import GroupItem from "./GroupItem.vue";
import DetailAd from "@/components/advertisement/DetailAd.vue";
import * as api from "@/api/group.js";

export default {
  name: "GroupHome",
  components: {
    GroupItem,
    DetailAd
  },
  data() {
    const myGroups = new Map();
    return {
      myGroups,
      recGroups: [],
      clickCount: 0,
      groupTotalNumber: 0,

      fetchRecing: false,
      myGroupChangeTracker: 0
    };
  },
  computed: {
    currentUserID() {
      return this.$store.state.CURRENTUSER.id;
    },
    groups() {
      return this.myGroupChangeTracker && [...this.myGroups.values()];
    }
  },
  created() {
    this.fetchMyGroups();
    this.fetchRecGroups();
    api.getGroupTotalNumber().then(count => {
      this.groupTotalNumber = count;
    });
  },
  methods: {
    formateGroups(groups) {
      groups.forEach(group => {
        this.myGroups.set(group.id, group);
        this.myGroupChangeTracker += 1;
      });
    },
    fetchMyGroups() {
      api.getMyGroups().then(groups => {
        this.formateGroups(groups);
      });
    },
    fetchRecGroups() {
      if (this.fetchRecing) return;
      this.fetchRecing = true;
      api.getRecGroups().then(groups => {
        this.recGroups = groups;
        this.clickCount += 1;
        this.fetchRecing = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.p-group-home {
  .group-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    background-color: #fff;
    font-size: 24px;
    color: @text-color3;
    padding: 20px;

    strong {
      font-size: 40px;
      color: #f4504d;
    }

    .m-svg-small {
      transition: transform 0.5s ease;
    }
  }

  .group-list {
    li {
      border-top: 1px solid @border-color; /*no*/
    }
  }
}
</style>
