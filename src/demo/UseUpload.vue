<script setup lang="ts">
import { watch, ref, h, VNode } from 'vue'
import { useUpload } from '@noi/core'

const { upload, append } = useUpload({ url: '#', accept: 'image/*' })

const inputChange = (event) => {
  append(event.target.files[0])
}
</script>

<template>
  <input accept="" type="file" @change="inputChange" />
  <br>
  <button @click="upload">upload</button>
</template>
