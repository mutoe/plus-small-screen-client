<template>
  <section class="c-form-item c-form-avatar-item" @click="beforeSelectFile">
    <div :class="shape" class="avatar-wrap">
      <img :src="avatar" class="m-avatar-img">
    </div>
    <span class="avatar-label">{{ label }}</span>
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
</template>

<script>
import { baseURL } from "@/api/api";
import getFirstFrameOfGif from "@/util/getFirstFrameOfGif.js";

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

export default {
  name: "FormAvatarItem",
  props: {
    value: { type: [String, Number], default: "" },
    label: { type: String, default: "上传头像" },

    /**
     * 头像形状 square: 方形 circle: 圆形
     */
    shape: { type: String, default: "circle" }
  },
  computed: {
    avatar() {
      if (!this.value) return null;
      return `${baseURL}/files/${this.value}`;
    }
  },
  methods: {
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
          screenCanvas.toBlob(async blob => {
            const formData = new FormData();
            formData.append("file", blob);
            const id = await this.$store.dispatch("uploadFile", formData);
            this.$Message.success("头像上传成功");
            this.$emit("input", id);
            this.$refs.imagefile.value = null;
          }, "image/png");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./formItem.less");

.c-form-avatar-item {
  height: 160px;
  border-bottom: 1px solid @border-color;
  padding-right: 20px;

  .avatar-wrap {
    flex: none;
    width: 90px;
    height: 90px;
    background-color: #ededed;
    overflow: hidden;

    &.circle {
      border-radius: 100%;
    }

    > img {
      width: 100%;
    }
  }

  .avatar-label {
    flex: auto;
    margin-left: 30px;
    color: #333;
  }
}
</style>
