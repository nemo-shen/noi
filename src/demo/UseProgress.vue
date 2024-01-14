<script setup lang="ts">
import { ref } from 'vue'
import { useProgress } from '@noi/core'

const { progress, increment, startAutoIncrement, isComplete } = useProgress({
  maxValue: 1000,
  autoIncrementRules: [
    { before: 30, delay: 100, increment: 2 },
    { before: 50, delay: 500, increment: 1 },
    { before: 70, delay: 300, increment: 3 },
  ],
  onChange(progress) {
    console.log(progress)
  },
})
</script>

<template>
  <div>
    {{ isComplete }}
    <div>{{ progress }}%</div>
    <template v-for="i in Math.floor(progress)">|</template>
  </div>

  <button @click="increment(50)">increment</button>
  <button @click="startAutoIncrement()">auto increment</button>
</template>
