<script setup lang="ts">
import { watch, ref, h, VNode } from 'vue'
import { useUpload } from '@noi/core'

const url = 'https://run.mocky.io/v3/da20c84f-fbe5-4510-8f24-80fa61474790'
const { upload, append, files } = useUpload({ url })

const inputChange = (event) => {
  append(event.target.files[0])
}
</script>

<template>
  <div v-for="(item, index) in files" :key="index">
    <!-- <img :src="item.data" alt="" /> -->
    {{ item.name }}
    <br>
    {{ item.ext }}
    <br />
    {{ item.status }}
    <hr />
  </div>
  <br />
  <input accept="" type="file" @change="inputChange" />
  <br />
  <button @click="upload">upload</button>
</template>
