<template>
    <div class="meeting-menu-item">
        <img class="item-background" :src="backgroundUrl" alt=""/>
        <img
            class="item-icon"
            :src="iconUrl"
            :alt="props.btnName"/>
        <div class="item-text">
            {{ props.btnName }}
        </div>
    </div>
</template>

<script setup lang="ts">
import {require} from '@/utils/require.ts';

const props = defineProps({
    btnName: String,
    iconName: String,
    backgroundName: String
});
const iconUrl = require(`@/assets/meeting/${props.iconName}.svg`)
const backgroundUrl = require(`@/assets/meeting/${props.backgroundName}.svg`);
</script>

<style lang="less">
@import "meeting_menu_item.less";
</style>
