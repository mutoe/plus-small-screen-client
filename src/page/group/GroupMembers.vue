<template>
  <transition name="popr">
    <div v-if="visible" class="p-group-members">
      <search-bar
        v-model="keyword"
        :back="close"
        class="search-bar"/>

      <ul>
        <li v-for="user in list" :key="user.id">
          <group-user-item :user="user" />
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import SearchBar from "@/components/common/SearchBar.vue";

export default {
  name: "GroupMembers",
  components: { SearchBar },
  props: {
    group: { type: Object, required: true }
  },
  data() {
    return {
      keyword: "",
      visible: false,
      list: []
    };
  },
  computed: {
    groupId() {
      return this.$route.params.groupId;
    }
  },
  create() {
    this.fetchMembers();
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    async fetchMembers() {
      const list = await this.$store.dispatch("group/getMembers", {
        groupId: this.groupId
      });
      this.list = list;
    }
  }
};
</script>

<style lang="less" scoped>
.p-group-members {
  background-color: #fff;
}
</style>
