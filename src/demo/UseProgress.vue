<script setup lang="ts">
import { ref } from 'vue'
import { useProgress } from '@noi/core'

const { progress, increment, startAutoIncrement } = useProgress({
  autoIncrementRules: [
    { before: 30, delay: 100, increment: 2 },
    { before: 50, delay: 500, increment: 1 },
    { before: 70, delay: 300, increment: 3 },
  ],
})
</script>

<template>
  <div>
    <div>{{ progress }}</div>
    <template v-for="i in progress">|</template>
  </div>

  <button @click="increment()">increment</button>
  <button @click="startAutoIncrement()">auto increment</button>
</template>
