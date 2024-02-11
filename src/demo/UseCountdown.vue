<script setup lang="ts">
import { watch, ref, h, VNode } from 'vue'
import { useCountdown } from '@noi/core'

const { countdown, start, stop, reset } = useCountdown({
  duration: 3000,
  interval: 100,
  onComplete: () => {
    console.log('complete');
  }
})
</script>

<template>
  {{ countdown }}
  <br />
  <button @click="start">start</button>
  <br />
  <button @click="stop">stop</button>
  <br />
  <button @click="reset">reset</button>
</template>
