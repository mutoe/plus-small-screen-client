<template>
  <section class="c-form-item c-form-location-item">
    <label>{{ label }}</label>
    <div class="input-wrap" @click="switchPosition">
      <span :class="{placeholder: !value.label}">{{ value.label || "设置圈子的地理位置" }}</span>
      <svg class="m-style-svg m-svg-def m-entry-append">
        <use xlink:href="#base-arrow-r"/>
      </svg>
    </div>

    <location
      :show="showPosition"
      :is-component="true"
      @close="close" />

  </section>
</template>

<script>
import Location from "@/page/Location.vue";

export default {
  name: "FormLocationItem",
  components: { Location },
  props: {
    value: { type: null, default: () => {} },
    label: { type: String, default: "位置" }
  },
  data() {
    return {
      showPosition: false
    };
  },
  methods: {
    switchPosition() {
      this.showPosition = true;
    },
    close(val) {
      this.showPosition = false;
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./formItem.less");
</style>
