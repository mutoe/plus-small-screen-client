<template>
  <div class="p-group-create">
    <common-header>创建圈子
      <span
        slot="left"
        class="m-send-btn"
        @click="goBack">取消</span>
      <template slot="right">
        <svg v-if="loading" class="m-style-svg m-svg-def">
          <use xlink:href="#base-loading"/>
        </svg>
        <a
          v-else
          :class="{ disabled }"
          class="m-send-btn"
          @click.prevent="handleOk">创建</a>
      </template>
    </common-header>

    <main style="background-color: #fff">

      <form-avatar-item
        v-model="form.avatar"
        label="上传圈子头像"
        shape="circle"/>

      <form-input-item
        v-model="form.name"
        label="圈名"
        maxlength="20"
        placeholder="输入圈名, 20字以内"/>

      <section class="m-box m-aln-stre m-justify-bet p-info-row m-bb1">
        <label>类别</label>
        <div
          class="m-box m-aln-center m-justify-bet m-flex-grow1 m-flex-shrink1 input"
          @click="switchMode">
          <span>{{ modeMap[form.mode] }}</span>
          <svg class="m-style-svg m-svg-def m-entry-append">
            <use xlink:href="#base-arrow-r"/>
          </svg>
        </div>
      </section>

      <form-tags-item v-model="form.tags" />

      <!-- 位置选择组件 -->
      <form-location-item v-model="form.location"/>

      <section class="m-box m-aln-stre m-justify-bet p-info-row">
        <label for="bio" class="m-flex-grow0 m-flex-shrink0">简介</label>
        <div class="m-box m-aln-center m-justify-bet m-flex-grow1 m-flex-shrink1 input">
          <span
            v-if="form.bio.length === 0 && !bioIsFocus"
            class="placeholder m-flex-grow1"
            @click="editBio">编辑简介</span>
          <div
            v-show="form.bio.length > 0 || bioIsFocus"
            class="m-box-model m-fd-row m-flex-grow1 m-flex-shrink1 m-aln-end m-justify-end m-wz-def">
            <div
              ref="bioEditor"
              contenteditable="true"
              class="m-flex-grow1 m-shrink-1 m-flex-base0 m-textarea"
              @input="bioInput"
              @blur="bioBlur"/>
            <i style="font-size: 10px; margin-right: 0.2rem">
              <b :style="{color: form.bio.length > 50 ? `#f4504d`: `inherit`}">{{ form.bio.length }}</b>/50
            </i>
          </div>
        </div>
      </section>
    </main>


  </div>
</template>

<script>
import bus from "@/bus";

const modeMap = {
  public: "公开圈子",
  private: "私有圈子",
  paid: "付费圈子"
};

export default {
  name: "GroupCreate",
  components: {
    Location
  },
  data() {
    return {
      loading: false,
      disabled: true,
      bioIsFocus: false,
      showPosition: false,

      modeMap,

      form: {
        name: "",
        tags: [],
        mode: "",
        bio: "",
        location: "",
        avatar: null
      }
    };
  },
  watch: {
    bioIsFocus(val) {
      val && this.$refs.bioEditor.click() && this.$refs.bioEditor.focus();
    }
  },
  methods: {
    editBio() {
      this.bioIsFocus = true;
    },
    bioBlur() {
      this.$refs.bioEditor.textContent = this.form.bio;
      this.bioIsFocus = false;
    },
    bioInput(e) {
      const $el = e.target;
      const value = $el.textContent;
      this.form.bio = value;
    },

    switchMode() {
      const actions = [];
      for (const [key, value] of modeMap) {
        actions.push({
          text: value,
          method: () => {
            this.form.mode = key;
          }
        });
      }
      bus.$emit("actionSheet", actions, "取消");
    }
  }
};
</script>

<style lang="less" scoped>
.p-group-create input[type="text"] {
  height: 100%;
  font-size: 28px;
  line-height: normal;
  vertical-align: middle;
}
.p-group-create textarea {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  background-color: transparent;
  outline: 0;
  border: 0;
  resize: none;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
}
.p-group-create-row {
  position: relative;
  padding: 35px 0 35px 0;
  margin-left: 140px;
  min-height: 100px;
}
.p-group-create-row .input {
  font-size: 30px;
  line-height: 1;
}
.p-group-create-row label {
  display: flex;
  align-items: center;
  margin-left: -110px;
  width: 110px;
  font-size: 30px;
  line-height: inherit;
  color: @text-color3;
}
.p-group-create-row .m-wz-def {
  font-size: 30px;
  line-height: inherit;
}
.p-group-create-row .placeholder {
  color: #ccc;
}
.p-group-create .m-avatar-box {
  margin-right: 35px;
}
.p-group-create .m-send-btn {
  color: @success;
}
.p-group-create .m-entry-append {
  margin-right: 20px;
}
</style>
