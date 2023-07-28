<template>
  <div class="member-card">
    <div class="blue-name">
      {{nickName}}
    </div>
    <div class="name-card">
      <img
          src="@/assets/meetingroom/ic_meetingroom_host_tag.svg"
          alt=""
          v-if="isHost"
      />
      <img
          src="@/assets/meetingroom/ic_meetingroom_mic_off.svg"
          v-if="isMute"
      />
      <img
          src="@/assets/meetingroom/ic_meetingroom_mic_on.svg"
          v-if="!isMute"
      />
      <span>{{ userName }}</span>
    </div>
    <div class="net-connection" v-if="connentStatus >= 3">
      <img src="@/assets/meetingroom/ic_meetingroom_remote_net_bad.svg" />
    </div>
    <div :id="playerID" class="member-player"></div>
  </div>

</template>


<script setup lang="ts">
import {computed} from "vue";

const props= defineProps({
  nickName:String,
  userName:String,
  isMute:Boolean,
  isHost:Boolean,
  connentStatus:Number,
  userID:String,
  userPlayer:Object,
  isShow:Boolean
})

const playerID = computed(()=>{
  return `player_${props.userID}`
})

</script>



<style lang="less">
@import "index";
</style>
