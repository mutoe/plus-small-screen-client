<template>
  <section class="c-form-item c-form-avatar-item" @click="beforeSelectFile">
    <div :class="shape" class="avatar-wrap">
      <img :src="value" class="m-avatar-img">
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
    value: { type: String, default: "" },
    label: { type: String, default: "上传头像" },

    /**
     * 头像形状 square: 方形 circle: 圆形
     */
    shape: { type: String, default: "circle" }
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
          screenCanvas.toBlob(blob => {
            const formData = new FormData();
            formData.append("avatar", blob);
            this.$http
              .post("/user/avatar", formData, {
                validateStatus: s => s === 204
              })
              .then(() => {
                this.$Message.success("头像更新成功");
                this.$emit("input", screenCanvas.toDataURL());
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
