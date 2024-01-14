<script setup lang="ts">
import { ref } from 'vue'
import { useLoading } from '@noi/core'

const { isLoading, start, stop } = useLoading()

// const upload = () => {
//   start();

//   setTimeout(() => {
//     stop()
//   }, 1000)
// }

// const loading = ref(false)

// const upload = () => {
//   loading.value = true

//   setTimeout(() => {
//     loading.value = false
//   }, 1000)
// }
</script>

<template>
  <div v-show="isLoading">loading...</div>
  <button @click="start">start loading</button>
  <button @click="stop">stop loading</button>
</template>
