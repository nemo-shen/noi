<script setup lang="ts">
import { ref } from 'vue'
import { useEllipsis } from '@noi/core'
import { useWindowSize } from '@vueuse/core'
const root = ref<HTMLElement>()
const { content, state, toggle } = useEllipsis(root, {
  content: '擁有正確的座右銘，可以幫助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！'
})
// const { width } = useWindowSize()
</script>

<template>
  <div ref="root"></div>
</template>
