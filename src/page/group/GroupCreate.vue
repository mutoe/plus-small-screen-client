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
      <section
        style="margin-left: 0; padding-left: .3rem"
        class="m-box m-aln-center m-justify-bet m-main m-bb1 p-info-row"
        @click="beforeSelectFile">
        <div class="m-flex-shrink0 m-flex-grow0 m-avatar-box">
          <img :src="avatar" class="m-avatar-img">
        </div>
        <span class="m-flex-grow1 m-flex-shrink1">上传圈子头像</span>
        <svg class="m-style-svg m-svg-def m-entry-append">
          <use xlink:href="#base-arrow-r"/>
        </svg>
        <input
          ref="imagefile"
          type="file"
          class="m-rfile"
          accept="image/jpeg,image/webp,image/jpg,image/png,image/bmp"
          @change="selectPhoto">
      </section>

      <section class="m-box m-aln-stre m-justify-bet p-info-row m-bb1">
        <label for="ipt-name">圈名</label>
        <div class="m-box m-aln-center m-justify-bet m-flex-grow1 m-flex-shrink1 input">
          <input
            id="ipt-name"
            v-model="form.name"
            type="text"
            placeholder="输入圈名, 20字以内"
            class="m-flex-grow1 m-flex-shrink1"
            maxlength="20">
        </div>
      </section>

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

      <section class="m-box m-aln-stre m-justify-bet p-info-row m-bb1" @click="switchTags">
        <label>标签</label>
        <div class="m-box m-aln-center m-justify-bet m-flex-grow1 m-flex-shrink1 input">
          <span v-if="form.tags.length === 0" class="placeholder">选择标签</span>
          <div v-else class="m-tag-list m-tags">
            <span
              v-for="tag in form.tags"
              :key="tag.id"
              class="m-tag">{{ tag.name }}</span>
          </div>
          <svg class="m-style-svg m-svg-def m-entry-append">
            <use xlink:href="#base-arrow-r"/>
          </svg>
        </div>
      </section>

      <section class="m-box m-aln-stre m-justify-bet p-info-row m-bb1">
        <label>位置</label>
        <div class="m-box m-aln-center m-justify-bet m-flex-grow1 m-flex-shrink1 input" @click="switchPosition">
          <span :class="{placeholder: !location}">{{ location || "设置圈子的地理位置" }}</span>
          <svg class="m-style-svg m-svg-def m-entry-append">
            <use xlink:href="#base-arrow-r"/>
          </svg>
        </div>
      </section>

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

    <location
      :show="showPosition"
      :is-component="true"
      @close="switchPosition" />
  </div>
</template>

<script>
import bus from "@/bus";
import getFirstFrameOfGif from "@/util/getFirstFrameOfGif.js";
import Location from "@/page/Location.vue";

/**
 * Canvas toBlob
 */
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
    value: function(callback, type, quality) {
      var binStr = atob(this.toDataURL(type, quality).split(",")[1]),
        len = binStr.length,
        arr = new Uint8Array(len);

      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }

      callback(new Blob([arr], { type: type || "image/png" }));
    }
  });
}

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
      avatar: null,
      location: "",
      bioIsFocus: false,
      showPosition: false,

      modeMap,

      form: {
        name: "",
        tags: [],
        mode: "",
        bio: ""
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
    switchTags() {
      const chooseTags = this.form.tags.map(t => t.id);
      const nextStep = tags => {
        this.change =
          tags.map(n => n.id).join(",") !== this.CURRENTUSER.tags.join(",");
        this.form.tags = tags;
      };
      const onSelect = tagId => {
        console.log("selected", tagId);
      };
      const onRemove = tagId => {
        console.log("deleted", tagId);
      };
      bus.$emit("choose-tags", { chooseTags, nextStep, onSelect, onRemove });
    },
    beforeSelectFile() {
      this.$refs.imagefile.click();
    },
    async selectPhoto(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const cropperURL = await getFirstFrameOfGif(files[0]);
      this.$ImgCropper.show({
        url: cropperURL,
        round: false,
        onCancel: () => {
          this.$refs.imagefile.value = null;
        },
        onOk: screenCanvas => {
          screenCanvas.toBlob(blob => {
            const formData = new FormData();
            formData.append("avatar", blob);
            this.$http
              .post("/user/avatar", formData, {
                validateStatus: s => s === 204
              })
              .then(() => {
                this.$Message.success("头像更新成功");
                this.avatar = screenCanvas.toDataURL();
              })
              .catch((err = {}) => {
                console.warn(err);
                const {
                  response: { data = { message: "更新头像失败" } }
                } = err;
                this.$Message.error(data);
              });
            this.$refs.imagefile.value = null;
          }, "image/png");
        }
      });
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
    },
    switchPosition(val) {
      this.showPosition = !this.showPosition;
      val && (this.location = val.label);
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
