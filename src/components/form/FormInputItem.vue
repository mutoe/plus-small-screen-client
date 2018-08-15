<template>
  <section class="c-form-item c-form-input-item">
    <label>{{ label }}</label>
    <div class="input-wrap">
      <input
        :value="value"
        :maxlength="maxlength"
        :placeholder="placeholder"
        type="text"
        @input="$emit('input', $event.target.value)">
    </div>
  </section>
</template>

<script>
export default {
  name: "FormInputItem",
  props: {
    value: { type: String, default: "" },
    label: { type: String, required: true },
    maxlength: { type: [Number, String], default: null },
    placeholder: { type: String, default: "" }
  }
};
</script>

<style lang="less" scoped>
@import url("./formItem.less");

.c-form-input-item {
  .input-wrap {
    input {
      font-size: 30px;
      padding: 0;
      width: 100%;
    }
  }
}
</style>
