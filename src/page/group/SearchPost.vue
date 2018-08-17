<template>
  <div class="p-search-post">

    <search-bar v-model="keywordOrigin"/>

    <jo-load-more
      ref="loadmore"
      :auto-load="false"
      :show-bottom="list.length > 0"
      @onLoadMore="onLoadMore">
      <!-- <group-feed-card/> -->
    </jo-load-more>

    <p v-show="loading" class="load-more-ph m-text-c mt10">正在搜索...</p>
    <div v-show="noResult && !loading && keyword && !list.length" class="placeholder m-no-find"/>

  </div>
</template>

<script>
import _ from "lodash";
import SearchBar from "@/components/common/SearchBar.vue";
import GroupFeedCard from "@/components/FeedCard/GroupFeedCard.vue";

export default {
  name: "SearchPost",
  components: {
    SearchBar,
    GroupFeedCard
  },
  data() {
    return {
      keywordOrigin: "",
      list: [],
      loading: false,
      noResult: false
    };
  },
  computed: {
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
    }
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
      const data = await this.$store.dispatch("group/searchPosts", {
        keyword: this.keyword,
        group_id: this.groupId
      });
      this.loading = false;
      this.list = data;
      console.log(data);
    }, 600),

    async onLoadMore() {
      if (!this.keyword) return;
      this.loading = true;
      const data = await this.$store.dispatch("group/searchPosts", {
        keyword: this.keyword,
        group_id: this.groupId,
        offset: this.list.length
      });
      this.loading = false;
      this.list = [...this.list, ...data];
      console.log(data);
    }
  }
};
</script>
