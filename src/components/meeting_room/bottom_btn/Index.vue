<template>
  <div class="bottom-btn">
    <img :src="iconUrl" alt="">
    <div>{{props.iconTitle}}</div>
  </div>
</template>

<script setup lang="ts">

import {require} from "@/utils/require.ts";

const props = defineProps({
  iconTitle:String,
  iconName:String
});
const iconUrl=require(`@/assets/meeting_room/ic_meeting_room_${props.iconName}.svg`)

</script>



<style lang="less">
@import "index";
</style>
