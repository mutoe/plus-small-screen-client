<template>
  <section class="c-form-item c-form-tags-item" @click="switchTags">
    <label>{{ label }}</label>
    <div class="input-wrap">
      <span v-if="value.length === 0" class="placeholder">选择标签</span>
      <div v-else class="m-tag-list m-tags">
        <span
          v-for="tag in value"
          :key="tag.id"
          class="m-tag">{{ tag.name }}</span>
      </div>
      <svg class="m-style-svg m-svg-def m-entry-append">
        <use xlink:href="#base-arrow-r"/>
      </svg>
    </div>
  </section>
</template>

<script>
import bus from "@/bus";

export default {
  name: "FormTagsItem",
  props: {
    value: { type: Array, default: () => [] },
    label: { type: String, default: "标签" }
  },
  methods: {
    switchTags() {
      const chooseTags = this.value.map(t => t.id);
      const nextStep = tags => {
        this.$emit("input", tags);
      };
      const onSelect = tagId => {
        this.$emit("select", tagId);
      };
      const onRemove = tagId => {
        this.$emit("delete", tagId);
      };
      bus.$emit("choose-tags", { chooseTags, nextStep, onSelect, onRemove });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./formItem.less");
</style>
