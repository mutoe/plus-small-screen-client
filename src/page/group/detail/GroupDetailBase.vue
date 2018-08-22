<template>
  <transition>
    <router-view/>
  </transition>
</template>

<script>
export default {
  name: "GroupDetailBase",
  computed: {
    groupId() {
      return this.$route.params.groupId;
    }
  },
  created() {
    this.$store.dispatch("group/getGroupById", { groupId: this.groupId });
  }
};
</script>
