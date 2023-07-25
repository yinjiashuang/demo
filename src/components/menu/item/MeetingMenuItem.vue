<template>
  <div class="meeting-menu-item">
    <img class="item-background" :src="imageUrl" />
    <img
      class="item-icon"
      :src="`@/assets/meeting/${props.iconName}.svg`"
      :alt="props.btnName"
    />
    <div class="item-text">
      {{ props.btnName }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  btnName: String,
  iconName: String,
  backgroundName: String
});

const imageUrl = new URL("", import.meta.url).href;
// url('@renderer/assets/meeting/${props.backgroundName}.svg')
</script>

<style lang="less">
@import "meeting_menu_item.less";
</style>
