<template>
  <section class="c-form-item c-form-location-item">
    <label>{{ label }}</label>
    <div class="input-wrap" @click="switchPosition">
      <span :class="{placeholder: !value}">{{ value || "设置圈子的地理位置" }}</span>
      <svg class="m-style-svg m-svg-def m-entry-append">
        <use xlink:href="#base-arrow-r"/>
      </svg>
    </div>

    <location
      :show="showPosition"
      :is-component="true"
      @close="switchPosition" />

  </section>
</template>

<script>
import Location from "@/page/Location.vue";

export default {
  name: "FormLocationItem",
  components: { Location },
  props: {
    value: { type: String, default: "" },
    label: { type: String, default: "位置" }
  },
  data() {
    return {
      showPosition: false
    };
  },
  methods: {
    switchPosition(val) {
      this.showPosition = !this.showPosition;
      val && this.$emit("input", val.label);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./formItem.less");
</style>
