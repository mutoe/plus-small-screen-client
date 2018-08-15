<template>
  <common-header class="c-switch-bar">
    <div class="tab">
      <!-- Queation type link. -->
      <router-link
        :replace="true"
        :exact="true"
        :class="{active: $route.path === '/question'}"
        class="item"
        to="/question" >
        问答
      </router-link>

      <!-- Tags type link. -->
      <router-link
        :replace="true"
        :exact="true"
        :class="{active: $route.path === '/question/topics'}"
        class="item"
        to="/question/topics" >
        专题
      </router-link>
    </div>

    <template slot="right">
      <router-link to="/question/search" >
        <v-icon class="search-btn" type="base-search"/>
      </router-link>
    </template>
  </common-header>
</template>

<script>
export default {
  name: "QuestionSwitchBar"
};
</script>

<style lang="less" scoped>
.c-switch-bar {
  position: fixed;
  border-color: #dedede;
  z-index: 10;

  .search-btn {
    color: #333;
  }

  .tab {
    display: inline-flex;

    .item {
      width: 125px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      box-sizing: content-box;
      border: solid 1px #59b6d7;
      color: #59b6d7;
      font-size: 32px;

      &.active {
        background: #59b6d7;
        color: #fff;
      }

      &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }

      &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }
    }
  }
}
</style>
