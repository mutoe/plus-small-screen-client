<template>
  <section :class="`c-form-${type}-item`" class="c-form-item">
    <label>{{ label }}</label>

    <!-- 普通文本输入框 -->
    <div v-if="type === 'input'" class="input-wrap">
      <input
        :value="value"
        :maxlength="maxlength"
        :placeholder="placeholder"
        type="text"
        @input="$emit('input', $event.target.value)">
    </div>

    <!-- 多行文本输入框 -->
    <div v-else-if="type === 'textarea'" class="textarea-wrap">
      <div class="textarea-shadow">{{ value }}</div> <!-- 用于撑起文本框自适应高度 -->
      <textarea
        ref="textarea"
        :value="value"
        :placeholder="placeholder"
        :maxlength="maxlength"
        rows="1"
        @input="$emit('input', $event.target.value)" />
      <span v-show="value.length > warnlength" class="word-length">{{ value.length }} / {{ maxlength }}</span>
    </div>

  </section>
</template>

<script>
export default {
  name: "FormInputItem",
  props: {
    value: { type: String, default: "" },
    label: { type: String, required: true },

    /**
     * 文本框类型
     * 只接受 'input' 'textarea'
     */
    type: {
      type: String,
      default: "input",
      validator: value => {
        return ["input", "textarea"].includes(value);
      }
    },
    maxlength: { type: [Number, String], default: null },
    warnlength: { type: [Number, String], default: null },
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

.c-form-textarea-item {
  height: auto;

  > label {
    align-self: flex-start;
    padding-top: 28px;
  }

  .textarea-wrap {
    position: relative;
    width: 100%;
    height: calc(~"100% + 40px");
    padding-right: 20px;

    .textarea-shadow {
      opacity: 0.3;
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
    }

    .word-length {
      display: block;
      font-size: 22px;
      margin-top: -18px;
      padding-bottom: 18px;
      text-align: right;
    }
  }
}
</style>
