# 鹰眼会议 Client 端

## Vue 文件模板

```vue

<template>
  <div>
    {{param.param1}}
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, watch} from 'vue';

/**
 * params
 */
type ParamType = {
  param1: string
}
const param = reactive<ParamType>({param1: '1'});
const computed = computed();
watch(param, (newValue, oldValue) => {
  console.log(`${newValue},${oldValue}`);
});
/**
 * method
 */
const handle = (): void => {

};
/**
 * lifecycle
 */
onMounted(() => {
  console.log('onMounted');
});
</script>
<style lang="less">

</style>

```

## 命名规范

### assets

- 内部文件夹名称 下划线分割：`meeting_room`

- 图片资源命名规范为：ic_模块_名称，如：`ic_meeting_room_bg.png`

- 感觉为公共使用的图片资源 直接访日`assets`中即可

### less

- less文件命名规范为：less对应的vue文件的拆分，使用下划线分割：如，vue名称为MeetingRoom.vue，less就应该为meeting_room.less

- class名称规范为，使用横杠分割，如：`meeting-room-framework` 或者 `meeting-room-container`

### vue

- 文件命名规范，单词首字母大写，如：`MeetingRoom.vue

- `<script>` 标签内的参数名称按驼峰命名，如 meetingRoomId

- `<script>` 标签内排列顺序为`import`、 `type`、参数、计算属性、`watch`、方法、生命周期 由上至下排列

- `<style>` 便签 不添加scope

- 文件夹命名规范，(`views` 文件夹下 和 `components` 文件夹下均适用)按下划线分割命名，如`meeting_room_grid_frame`

### components

- 公共组件，直接放入`components/common`文件夹下即可，如，封装一个公共弹窗，命名类似`PublicModal.vue`，它应该放在`~/components/common/public_modal/PublicModal.vue`
  ,伴随组件的应该还会有一个，`public_modal.less`文件

- 组件命名规范，不使用`Index.vue` 或者 `index.vue` 作为组件的命名，直接使用组件功能点为 名称，如：会议室内每一个画面的组件，可以命名为，`MeetingRoomCard.vue` 最为名称，
  **为的是当你使用该组件时可以有更良好的代码提示**

