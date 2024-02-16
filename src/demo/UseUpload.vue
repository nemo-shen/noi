<script setup lang="ts">
import { watch, ref, h, VNode } from 'vue'
import { useUpload } from '@noi/core'

const url = 'https://run.mocky.io/v3/da20c84f-fbe5-4510-8f24-80fa61474790'
const { upload, append, files, remove } = useUpload({ url, maxSize: 100 })

const inputChange = (event) => {
  append(event.target.files)
}
</script>

<template>
  <div v-for="(item, index) in files" :key="index">
    <!-- <img :src="item.data" alt="" /> -->
    {{ item.name }} | {{ item.ext }} | {{ item.status }} | <button @click="remove(index)">delete</button>
    <hr />
  </div>
  <br />
  <input accept="" type="file" @change="inputChange" multiple />
  <br />
  <button @click="upload">upload</button>
</template>
