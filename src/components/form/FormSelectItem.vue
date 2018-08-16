<template>
  <section class="c-form-item c-form-select-item">
    <label>{{ label }}</label>
    <div class="input-wrap" @click="onClick">
      <span :class="{placeholder: value.length === 0}">{{ value || placeholder }}</span>
      <svg class="m-style-svg m-svg-def m-entry-append">
        <use xlink:href="#base-arrow-r"/>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: "FormSelectItem",
  props: {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    multiline: { type: Boolean, default: false }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./formItem.less");
</style>
