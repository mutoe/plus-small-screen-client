<template>
  <div class="p-group-search">

    <search-bar v-model="keywordOrigin" class="search-bar"/>

    <nav-tab
      :nav="nav"
      :route="{name: 'groupSearch', query: 'type'}"
      class="nav-tab"/>

    <jo-load-more
      ref="loadmore"
      :auto-load="false"
      :show-bottom="list.length > 0"
      class="loadmore"
      @onRefresh="onSearchInput"
      @onLoadMore="onLoadMore">

      <template v-if="type === 'groups'">
        <group-item
          v-for="group in list"
          :key="group.id"
          :group="group"/>
      </template>

      <template v-if="type === 'posts'">
        <group-feed-card
          v-for="post in list"
          :key="post.id"
          :feed="post"/>
      </template>

    </jo-load-more>

    <p v-show="loading" class="load-more-ph m-text-c mt10">正在搜索...</p>
    <div v-show="noResult &&!loading && keyword && !list.length" class="m-no-find"/>

  </div>
</template>

<script>
import _ from "lodash";
import SearchBar from "@/components/common/SearchBar.vue";
import NavTab from "@/components/common/NavTab.vue";
import GroupItem from "./components/GroupItem.vue";
import GroupFeedCard from "@/components/FeedCard/GroupFeedCard.vue";

export default {
  name: "SearchPost",
  components: {
    SearchBar,
    NavTab,
    GroupItem,
    GroupFeedCard
  },
  data() {
    return {
      keywordOrigin: "",
      list: [],
      loading: false,
      noResult: false,
      nav: {
        groups: "圈子",
        posts: "帖子"
      }
    };
  },
  computed: {
    type() {
      return this.$route.query.type || "groups";
    },
    keyword() {
      return this.keywordOrigin.trim();
    },
    groupId() {
      return this.$route.params.groupId;
    }
  },
  watch: {
    keyword() {
      this.onSearchInput();
    },
    type() {
      this.list = [];
      this.onSearchInput();
    }
  },
  created() {
    if (!this.$route.query.type)
      this.$router.replace(
        Object.assign({}, this.$route, { query: { type: "groups" } })
      );
  },
  methods: {
    /**
     * 使用 lodash.debounce 防抖，每输入 600ms 后执行
     * 不要使用箭头函数，会导致 this 作用域丢失
     * @author mutoe <mutoe@foxmail.com>
     */
    onSearchInput: _.debounce(async function() {
      if (!this.keyword) return;
      this.loading = true;
      const data = await this.search();
      this.loading = false;
      this.list = data;
      this.noResult = !this.list.length;
      this.$refs.loadmore.afterRefresh(data.length < 15);
    }, 600),

    async onLoadMore() {
      if (!this.keyword) return;
      this.loading = true;
      const data = await this.search(this.list.length);
      this.loading = false;
      this.list = [...this.list, ...data];
      this.$refs.loadmore.afterLoadMore(data.length < 15);
    },

    search(offset) {
      if (this.type === "groups")
        return this.$store.dispatch("group/searchGroups", {
          keyword: this.keyword,
          offset
        });
      else
        return this.$store.dispatch("group/searchPosts", {
          keyword: this.keyword,
          group_id: this.groupId,
          offset
        });
    }
  }
};
</script>

<style lang="less" scoped>
.p-group-search {
  height: 100%;

  .loadmore {
    padding-top: 90+90px;
    height: 100%;
  }
  .search-bar {
    position: fixed;
  }
  .nav-tab {
    position: fixed;
    top: 90px;
  }
  .m-no-find {
    height: 100%;
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
