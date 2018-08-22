<template>
  <div class="c-group-user-item">
    <avatar :user="user"/>
    <span>{{ user.name }}</span>
  </div>
</template>

<script>
export default {
  name: "GroupUserItem",
  props: {
    user: { type: Object, required: true }
  }
};
</script>

<style lang="less" scoped>
.c-group-user-item {
  display: flex;
  align-items: center;
  height: 134px;
}
</style>
