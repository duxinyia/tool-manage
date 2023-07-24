<template>
	<div class="system-user-container layout-padding">基础数据</div>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/basics/basic/dialog.vue'));
</script>

<style scoped lang="scss"></style>
