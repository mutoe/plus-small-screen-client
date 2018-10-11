<template>
  <transition
    enter-active-class="animated bounceInRight"
    leave-active-class="animated bounceOutLeft">
    <div class="m-box-model m-pos-f p-signin-dynamic">

      <common-header>
        一键登录
        <router-link slot="right" to="/signup">注册</router-link>
      </common-header>

      <main class="m-box-model m-flex-grow1">
        <div class="m-form-row m-main">
          <label for="account">手机号</label>
          <div class="m-input">
            <input
              id="account"
              v-model="account"
              maxlength="11"
              type="number"
              placeholder="输入11位手机号">
          </div>
          <svg
            v-show="account.length > 0"
            class="m-style-svg m-svg-def"
            @click="account = ''">
            <use xlink:href="#icon-clean"/>
          </svg>
        </div>
        <div class="m-form-row m-main">
          <label for="password">验证码</label>
          <div class="m-input">
            <input
              id="password"
              v-model="code"
              maxlength="6"
              type="number"
              placeholder="输入4-6位验证码"
              @keyup.enter="signinByAccount">
          </div>
          <span :class="[{ disabledCode }, 'get-code']" @click="getCode">{{ codeText }}</span>
        </div>
        <div class="m-box m-aln-center m-text-box m-form-err-box">
          <span>{{ err | plusMessageFirst }}</span>
        </div>
        <div class="m-form-row" style="border: 0">
          <button
            :disabled="disabled"
            class="m-long-btn m-signin-btn"
            @click="signinByAccount">
            <circle-loading v-if="loading" />
            <span v-else>登录</span>
          </button>
        </div>

        <div class="dynamic-signin">
          <a @click="goBack">使用账号密码登陆</a>
        </div>
      </main>

    </div>
  </transition>
</template>

<script>
import { signinByAccount } from "@/api/user.js";

export default {
  name: "Signin",
  data() {
    return {
      err: "",
      account: "",
      code: "",
      loading: false,
      countdown: 0
    };
  },
  computed: {
    disabled() {
      return !this.account.length || this.code.length < 4 || this.loading;
    },
    disabledCode() {
      return this.account.length !== 11 || this.countdown;
    },
    codeText() {
      return this.countdown > 0 ? `${this.countdown}s后重发` : "获取验证码";
    }
  },
  methods: {
    countDown() {
      const t = setInterval(() => {
        if (--this.countdown <= 0) {
          this.countdown = 0;
          clearInterval(t);
        }
      }, 1000);
    },
    getCode() {
      if (this.disabledCode) return;
      let param = {
        phone: this.account
      };
      this.$http
        .post("verifycodes/register", param, {
          validateStatus: s => s === 202
        })
        .then(() => {
          this.countdown = 60;
          this.countDown();
          this.$Message.success("发送验证码成功");
        })
        .catch(({ response: { data: { errors = {} } = {} } = {} }) => {
          this.$Message.error(errors);
        });
    },
    signinByAccount() {
      this.err = "";
      this.loading = true;

      signinByAccount({
        login: this.account,
        verifiable_code: this.code
      }).then(state => {
        this.loading = false;
        state &&
          this.$nextTick(() => {
            this.$router.push(this.$route.query.redirect || "/feeds?type=hot");
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.p-signin-dynamic {
  background-color: #f4f5f6;

  .dynamic-signin {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin-top: 80px;
  }

  .get-code {
    color: @primary;

    &.disabledCode {
      color: @gray;
    }
  }
}
</style>
