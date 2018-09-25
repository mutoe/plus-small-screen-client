<template>
  <div class="textarea-wrap">
    <div class="textarea-shadow">{{ value }}</div> <!-- 用于撑起文本框自适应高度 -->
    <textarea
      ref="textarea"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :readonly="readonly"
      rows="1"
      @input="$emit('input', $event.target.value)" />
    <span v-show="maxlength && value.length > warnlength" class="word-length">{{ value.length }} / {{ maxlength }}</span>
  </div>
</template>

<script>
export default {
  name: "TextareaInput",
  props: {
    value: { type: String, default: "" },
    readonly: { type: Boolean, default: false },
    maxlength: { type: [Number, String], default: null },
    warnlength: { type: [Number, String], default: null },
    placeholder: { type: String, default: "" }
  }
};
</script>

<style lang="less" scoped>
.textarea-wrap {
  position: relative;
  width: 100%;
  height: calc(~"100% + 40px");
  padding-right: 20px;
  align-self: flex-start;

  .textarea-shadow {
    opacity: 0;
    min-height: 100px;
    padding: 28px 0;
    word-wrap: break-word;
    word-break: break-all;
  }

  textarea {
    position: absolute;
    top: 0;
    display: block;
    font-size: 30px;
    padding: 28px 0;
    width: calc(~"100% - 20px");
    height: 100%;
    overflow: hidden;
    resize: none;
    outline: none;
    min-height: 100px;
    background-color: transparent;
    word-wrap: break-word;
    word-break: break-all;

    &[readonly] {
      color: #999;
      cursor: not-allowed;
    }
  }

  .word-length {
    display: block;
    font-size: 22px;
    margin-top: -18px;
    padding-bottom: 18px;
    text-align: right;
  }
}
</style>
