<template>
  <div :class="`${prefixCls}`">

    <common-header>
      <diy-select
        :options="options"
        v-model="currentType"
        placeholder="动态评论置顶"
        style="margin-top: -1px"/>
    </common-header>

    <div
      :class="`${prefixCls}-container`"
      style="padding-top: 0.9rem">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const prefixCls = "auditList";
const options = [
  {
    value: "feedcomments",
    label: "动态评论置顶"
  },
  {
    value: "newscomments",
    label: "文章评论置顶"
  },
  {
    value: "groupposts",
    label: "帖子置顶"
  },
  {
    value: "groupcomments",
    label: "帖子评论置顶"
  },
  {
    value: "groupjoins",
    label: "圈子加入申请"
  }
];
// const items = {};

export default {
  name: "MyAudits",
  data: () => ({
    prefixCls,
    refreshData: [],
    options,
    currentType: "feedComment"
  }),
  computed: {
    ...mapState({
      // audits: state =>
    })
  },
  watch: {
    currentType(type) {
      this.$router.replace(`/message/audits/${type}`);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../style.less");

.c-common-header {
  position: fixed;
}

.diy-select {
  width: 10em;
}

.auditList {
  .diy-select--options {
    margin-top: -1px; /* no */
  }
}
</style>
