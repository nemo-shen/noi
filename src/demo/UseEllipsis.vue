<script setup lang="ts">
import { ref, h } from 'vue'
import { useEllipsis, EllipsisPosition } from '@noi/core'
import { useWindowSize } from '@vueuse/core'
const ellipsisRef = ref<HTMLElement>()
const sourceContent = ref(
  '擁有正確的座右銘，可以幫助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！'
)
const renderButton = () => {
  return h(
    'button',
    {
      on: {
        click: toggle,
      },
    },
    state === 'expanded' ? 'Collapsed' : 'Expanded'
  )
}
const { content, state, toggle } = useEllipsis(ellipsisRef, {
  content: sourceContent,
  position: EllipsisPosition.End,
  ellipsisText: '...',
})
</script>

<template>
  <div class="ellipsis" ref="ellipsisRef">{{ content }}</div>
  {{ state }}
  <button @click="toggle">
    {{ state === 'expanded' ? 'Collapsed' : 'Expanded' }}
  </button>
</template>

<style>
.ellipsis {
  width: 200px;
  font-size: 22px;
  line-height: 32px;
}
</style>
