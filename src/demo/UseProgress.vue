<script setup lang="ts">
import { ref } from 'vue'
import { useProgress } from '@noi/core'

const { progress, increment, startAutoIncrement } = useProgress({
  maxValue: 19000,
  autoIncrementRules: [
    { before: 30, delay: 100, increment: 2 },
    { before: 50, delay: 500, increment: 1 },
    { before: 70, delay: 300, increment: 3 },
  ],
})

/**
 * 3. 提供step能力，可以动态管理进度，但最终的finish需要明确告知
 * 6. 提供进度条描述文案 [{ value: 10, text: '111'}, { value: 20, text: '222' }]
 * 7. 提供onChange option，当进度变化时，会将进度返回，开发者可以通过这个callback做其他额外处理
 */
</script>

<template>
  <div>
    <div>{{ progress }}%</div>
    <template v-for="i in Math.floor(progress)">|</template>
  </div>

  <button @click="increment(1)">increment</button>
  <button @click="startAutoIncrement()">auto increment</button>
</template>
