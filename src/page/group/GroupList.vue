<template>
  <div class="p-groups">

    <common-header>
      全部圈子
      <template slot="right">
        <svg class="m-style-svg m-svg-def" @click="$router.push({name: 'groupSearch'})">
          <use xlink:href="#base-search"/>
        </svg>
        <svg class="m-style-svg m-svg-def" @click="$router.push({name: 'groupCreate'})">
          <use xlink:href="#group-add"/>
        </svg>
      </template>
    </common-header>

    <main>
      <nav class="m-box m-aln-center m-pos-f m-main m-bb1 p-groups-nav">
        <router-link
          :to="{name: 'groups', query: { type: 'recommend' }}"
          class="m-text-box p-groups-nav-item"
          exact
          replace
          tag="div"
          active-class="active">
          <span>推荐</span>
        </router-link>
        <router-link
          v-for="cate in categories"
          :to="{ name: 'groups', query: { category: cate.id } }"
          :key="cate.id"
          class="m-text-box p-groups-nav-item"
          exact
          replace
          tag="div"
          active-class="active">
          <span class="m-text-cut">{{ cate.name }}</span>
        </router-link>
      </nav>

      <jo-load-more
        ref="loadmore"
        :auto-load="false"
        style="padding-top: 0.9rem"
        @onRefresh="onRefresh"
        @onLoadMore="onLoadMore">
        <div
          v-for="group in groups"
          :key="group.id"
          class="m-bb1">
          <group-item :group="group" :show-action="true" />
        </div>
      </jo-load-more>

    </main>
  </div>
</template>

<script>
import GroupItem from "./components/GroupItem.vue";

export default {
  name: "GroupList",
  components: {
    GroupItem
  },
  data() {
    return {
      GROUPS: new Map(),
      GROUPChangeTracker: 1
    };
  },
  computed: {
    categories() {
      return this.$store.state.group.categories;
    },
    recommend: {
      get() {
        return this.$route.query.type || false;
      },
      set(val) {
        this.$route.query.type = val ? "recommend" : "";
      }
    },
    category() {
      return this.$route.query.category;
    },
    currentUserID() {
      return this.$store.state.CURRENTUSER.id;
    },
    currentType() {
      return this.recommend ? -1 : this.category;
    },
    groups() {
      return this.currentType &&
        this.GROUPChangeTracker &&
        this.GROUPS.has(this.currentType)
        ? Array.from(this.GROUPS.get(this.currentType).values())
        : [];
    }
  },
  watch: {
    currentType(val) {
      val && this.$refs.loadmore.beforeRefresh();
    }
  },
  created() {
    if (!this.$route.query.type && !this.$route.query.category)
      this.$router.replace(
        Object.assign({}, this.$route, { query: { type: "recommend" } })
      );
    this.$store.dispatch("group/getGroupTypes");
  },
  mounted() {
    this.$refs.loadmore.beforeRefresh();
  },
  methods: {
    formateGroups(groups) {
      const map = this.GROUPS.has(this.currentType)
        ? this.GROUPS.get(this.currentType)
        : new Map();
      groups.forEach(group => {
        map.set(group.id, group);
      });
      this.GROUPS.set(this.currentType, map);
      this.GROUPChangeTracker += 1;
    },
    switchCate(cate) {
      this.recommend = false;
      this.$route.query.category = cate.id;
    },
    async onRefresh() {
      const params = {};
      if (this.recommend) params.type = "recommend";
      else params.categoryId = this.category;

      const data = await this.$store.dispatch("group/getGroups", params);
      this.formateGroups(data);
      this.$refs.loadmore.afterRefresh(data.length < 15);
    },
    async onLoadMore() {
      const params = { offset: this.groups.length };
      if (this.recommend) params.type = "recommend";
      else params.categoryId = this.category;

      const data = await this.$store.dispatch("group/getGroups", params);
      this.formateGroups(data);
      this.$refs.loadmore.afterLoadMore(data.length < 15);
    }
  }
};
</script>

<style lang="less" scoped>
.p-groups-nav {
  padding: 0 30px;
  top: 90px;
  height: 90px;
  flex-wrap: nowrap;
  font-size: 26px;
  color: @text-color3;
  overflow-y: auto;

  &-item {
    flex: 0 0 auto;
    transition: all 0.1s ease;

    & + & {
      margin-left: 50px;
    }

    &.active {
      color: @text-color1;
      font-size: 30px;
    }
  }
}
</style>
