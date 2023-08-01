<template>
  <div class="member-card">
    <div class="blue-name">
      {{nickName}}
    </div>
    <div class="name-card">
      <img
          src="@/assets/meeting_room/ic_meeting_room_host_tag.svg"
          alt=""
          v-if="isHost"
      />
      <img
          src="@/assets/meeting_room/ic_meeting_room_mic_off.svg"
          v-if="isMute"
      />
      <img
          src="@/assets/meeting_room/ic_meeting_room_mic_on.svg"
          v-if="!isMute"
      />
      <span>{{ userName }}</span>
    </div>
    <div class="net-connection" v-if="connectStatus >= 3">
      <img src="@/assets/meeting_room/ic_meeting_room_remote_net_bad.svg" alt="" />
    </div>
    <canvas :id="playerID" class="member-player"></canvas>
  </div>

</template>


<script setup lang="ts">
import {computed, onMounted, onUnmounted} from 'vue';
const zgEngine = window.zgEngine;

const props= defineProps({
  nickName:String,
  userName:String,
  isMute:Boolean,
  isHost:Boolean,
  connectStatus:Number,
  userID:String,
  userPlayer:Object,
  isShow:Boolean
})

const playerID = computed(()=>{
  return `player_${props.userID}`
})

onMounted(()=>{
    zgEngine.startPreview({
        canvas: document.getElementById(playerID.value)
    });
})

onUnmounted(()=>{
    zgEngine.stopPreview();
})

</script>



<style lang="less">
@import "index";
</style>
