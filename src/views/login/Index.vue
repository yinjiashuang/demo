<template>
  <div class="login-container">
    <img class="login-left-img" src="@renderer/assets/login/ic_login_left_bg.png" />
    <div class="login-form">
      <img src="@renderer/assets/login/ic_login_logo.png" class="logo" alt="" />
      <span class="title">智能视频监控平台</span>
      <span class="sub-title">Intelligent Video System</span>
      <el-button
        v-loading.fullscreen.lock="fullLoading"
        :loading="loading"
        type="primary"
        class="authorization-button"
        @click="openFullLoading"
        >授权登录
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const fullLoading = ref(false);
const openFullLoading = (): void => {
  fullLoading.value = true;
  setTimeout(() => {
    fullLoading.value = false;
    router.push({
      name: "meeting_list"
    });
  }, 0);
};
const loading = ref<boolean>(false);
</script>
<style lang="less">
@import "index";
</style>
