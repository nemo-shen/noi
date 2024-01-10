<script setup lang="ts">
import { ref } from 'vue'
import { useEllipsis } from '@noi/core'
import { useWindowSize } from '@vueuse/core'
const root = ref<HTMLElement>()
const { content, state, toggle } = useEllipsis(root, {
  content: '去拥抱陌生，去期待惊喜。向海风许愿，在山海相见。愿你保持善良，从此拥有远方。风停在窗边，嘱咐我要热爱这个世界。'
})
// const { width } = useWindowSize()
</script>

<template>
  <div ref="root">{{ content }}</div>
</template>
