<script setup lang="ts">
import { h } from 'vue'
import { useToast } from '@noi/core'

const { open, close } = useToast()
const openNodeContent = () => {
  open(h('div', { class: 'nemo' }, 'hello world'))
}
</script>

<template>
  <button @click="open('abc')">open abc</button>
  <button @click="open('nemo')">open nemo</button>
  <button @click="openNodeContent">open node content</button>
  <button @click="close()">close</button>
</template>

<style>
.nemo {
  color: red;
}
</style>
