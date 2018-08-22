<template>
  <div class="p-group-members">
    <search-bar v-model="keyword" class="search-bar"/>

    <template v-if="keyword.length">
      <ul>
        <li v-for="m in searchList" :key="m.id">
          <group-user-item :member="m" />
        </li>
      </ul>
    </template>
    <template v-else>
      <h3>圈管理({{ administrator.length }})</h3>
      <ul>
        <li v-for="m in administrator" :key="m.id">
          <group-user-item :member="m" />
        </li>
      </ul>

      <h3>成员({{ member.length }})</h3>
      <ul>
        <li v-for="m in member" :key="m.id">
          <group-user-item :member="m" />
        </li>
      </ul>
    </template>

  </div>
</template>

<script>
import _ from "lodash";
import SearchBar from "@/components/common/SearchBar.vue";
import GroupUserItem from "../components/GroupUserItem.vue";

export default {
  name: "GroupMembers",
  components: { SearchBar, GroupUserItem },
  data() {
    return {
      keyword: "",
      member: [],
      administrator: [],
      searchList: []
    };
  },
  computed: {
    group() {
      return this.$store.state.group.current;
    },
    groupId() {
      return Number(this.$route.params.groupId);
    }
  },
  created() {
    if (!this.group.id) this.fetchGroup();
    this.fetchMembers();
  },
  methods: {
    async fetchMembers() {
      const list = await this.$store.dispatch("group/getMembers", {
        groupId: this.groupId
      });
      [this.member, this.administrator] = _.partition(
        list,
        m => m.role === "member"
      );
    },
    fetchGroup() {
      this.$store.dispatch("group/getGroupById", { groupId: this.groupId });
    }
  }
};
</script>

<style lang="less" scoped>
.p-group-members {
  h3 {
    padding: 15px 30px;
    font-size: 28px;
  }
  > ul {
    background-color: #fff;
  }
}
</style>
