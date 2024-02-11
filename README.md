# NOI

[![coverage](https://img.shields.io/codecov/c/github/nemo-shen/noi/main.svg)](https://codecov.io/gh/nemo-shen/noi)

NOI is a hight performance/light weight headless UI library.

Your can easily use it to create your own UI library.

For example, if you want to create a toast component and via a function to open it.
Your just focus on your UI and logic, and then use NOI to implement the function:

```ts
<script setup lang="ts">
import { useToast } from '@noi/core'

const { open } = useToast()
const openToast = () => {
  open(h('div', { class: 'my-class-name' }, 'hello world'))
}
</script>
```

```html
<template>
  <button @click="open('hello world')">show toast</button>
  <button @click="openToast">show toast with node</button>
</template>
```
