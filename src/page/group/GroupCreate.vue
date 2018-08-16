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

      <form-select-item
        v-model="form.category"
        label="分类"
        placeholder="选择圈子类别"
        @click="switchMode"/>

      <form-tags-item v-model="form.tags" />

      <form-location-item v-model="form.location"/>

      <form-input-item
        v-model="form.summary"
        type="textarea"
        label="简介"
        maxlength="255"
        warnlength="200"
        placeholder="编辑简介"/>

      <form-switch-item v-model="allowFeed" label="帖子同步至动态"/>

    </main>


  </div>
</template>

<script>
import bus from "@/bus";
import ChooseGroupCate from "./components/chooseGroupCate.vue";

export default {
  name: "GroupCreate",
  components: {
    Location,
    ChooseGroupCate
  },
  data() {
    return {
      loading: false,
      disabled: true,
      bioIsFocus: false,
      showPosition: false,

      form: {
        name: "",
        category: "",
        tags: [],
        mode: "",
        summary: "",
        location: "",
        avatar: null,
        allow_feed: 0
      }
    };
  },
  computed: {
    allowFeed: {
      get() {
        return !!this.form.allow_feed;
      },
      set(val) {
        this.form.allow_feed = val ? 1 : 0;
      }
    }
  },
  methods: {
    switchCate() {
      bus.$emit("choose-group-cate");
    },
    onGroupCateChange(cate) {
      this.form.category = cate.id;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
