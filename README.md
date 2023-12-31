# NOI

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

原名应该叫做: no ui (为什么叫noi而不是noui，是因为noi比较顺手)

类似 vueuse
通过使用 useXXX 对常见组件需要使用到的交互进行封装
例如: useSelect useOption useDropdown 等

目前社区中存在很棒的组件库，UI设计也非常棒
例如移动端的 vant，桌面端的 element-plus

但在实际业务开发中（尤其是移动端），虽然已经使用了组件库，但我们往往会在其基础上大改样式，以便能符合设计师的UI
（个人认为直接应用组件库提供的样式，毫不修改基本上是一种理想情况，实际开发中很难保持）

另外，对于样式的处理，社区中已经有非常成熟的css框架，例如 tailwind css

NOI 希望保留组件库的交互能力，并且允许开发者自行实现 DOM 和 css 的形式实现更贴合业务的 无UI 组件库

目前，本项目正在构思中
