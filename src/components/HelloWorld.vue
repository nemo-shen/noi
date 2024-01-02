<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@noi/core'
console.log('useToast', useToast);


defineProps({
  msg: String
})
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
