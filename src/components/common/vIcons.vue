<template>
  <i
    ref="icon"
    :style="wrapStyles"
    class="v-icon"
    @click="onClick">
    <svg
      :color="color"
      width="100%"
      height="100%">
      <use
        :xlink:href="`#${type}`"
        xmlns:xlink="http://www.w3.org/1999/xlink"/>
    </svg>
  </i>
</template>

<script>
export default {
  name: "VIcon",
  props: {
    type: { type: [String], required: true },
    height: { type: [String, Number], default: 0.32 },
    width: { type: [String, Number], default: 0.32 },
    color: { type: String, default: "" }
  },
  data() {
    return {
      wrapColor: this.color
    };
  },
  computed: {
    wrapStyles() {
      return {
        width: `${this.width}rem`,
        height: `${this.height}rem`,
        fill: this.wrapColor
      };
    }
  },
  mounted() {
    if (!this.color) {
      const el = this.$refs.icon;
      this.wrapColor = window.getComputedStyle(el, null).color;
    }
  },
  methods: {
    onClick(args) {
      this.$emit("click", args);
    }
  }
};
</script>

<style lang="less" scoped>
.v-icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
