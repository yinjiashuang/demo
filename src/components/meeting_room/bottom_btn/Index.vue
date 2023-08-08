<template>
  <div class="bottom-btn">
    <img :src="iconUrl" alt="">
    <div>{{props.iconTitle}}</div>
  </div>
</template>

<script setup lang="ts">

import {getImage} from '@/utils/utils.ts';

const props = defineProps({
  iconTitle:String,
  iconName:String
});
const iconUrl = getImage(`@/assets/meeting_room/ic_meeting_room_${props.iconName}.svg`);

</script>



<style lang="less">
@import "index";
</style>
