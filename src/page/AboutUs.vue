<template>
  <div class="about-us">

    <common-header>关于我们</common-header>

    <main>
      <div class="content" v-html="body"/>
    </main>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  computed: {
    aboutUs() {
      const { aboutUs = {} } = this.$store.state.CONFIG.site;
      return aboutUs;
    },
    body() {
      return this.aboutUs.content || "";
    }
  }
};
</script>

<style lang='less' scoped>
.about-us {
  .content {
    min-height: 100vh;
    background: #fff;
  }
}
</style>
