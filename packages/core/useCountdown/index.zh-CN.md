# UseCountdown

## 用法

### 基础用法

```ts
<script setup lang="ts">
import { useCountdown } from '@noi/core'

const { countdown, start } = useCountdown({ duration: 10 * 1000 })
</script>
```

```html
<template>
  {{ countdown }}
  <button @click="start">开始</button>
</template>
```

### 立即开始

```ts
<script setup lang="ts">
import { useCountdown } from '@noi/core'

const { countdown } = useCountdown({ duration: 10 * 1000, immediate: true })
</script>
```

```html
<template>{{ countdown }}</template>
```

### 自定义更新时间

你可以用 `interval` 自定义更新实现，实现毫秒级倒计时

```ts
<script setup lang="ts">
import { useCountdown } from '@noi/core'

const { countdown } = useCountdown({ duration: 10 * 1000, interval: 100, immediate: true })
</script>
```

```html
<template>{{ countdown }}</template>
```

### 判断倒计时是否结束

因为 `countdown` 是响应式的，因此，你可以用 `countdown.total === 0` 判断倒计时是否结束

```ts
<script setup lang="ts">
import { computed } from 'vue'
import { useCountdown } from '@noi/core'

const { countdown } = useCountdown({ duration: 10 * 1000, interval: 100, immediate: true })
const isComplete = computed(() => countdown.total === 0)
</script>
```

```html
<template> {{ countdown }} 是否结束: {{ isComplete }} </template>
```

### 手动控制倒计时

我们准备了几个实用的函数，用于控制倒计时，需要注意的是，如果你设置了 `immediate: true`，当你调用 `reset()` 之后还是会继续执行

```ts
<script setup lang="ts">
import { useCountdown } from '@noi/core'

const { countdown, start, stop, reset } = useCountdown({ duration: 10 * 1000, interval: 100 })
</script>
```

```html
<template>
  {{ countdown }}
  <button @click="start">开始</button>
  <button @click="stop">停止</button>
  <button @click="reset">重置</button>
</template>
```

## 类型定义

### UseCountdownOptions

| 名称      | 类型      | 默认值  | 是否必传 | 说明               |
| --------- | --------- | ------- | -------- | ------------------ |
| duration  | _number_  | -       | [x]      | 总时长(单位：毫秒) |
| interval  | _number_  | 1000    | [ ]      | 更新频率，默认1秒  |
| immediate | _boolean_ | _false_ | [ ]      | 是否立即开始倒计时 |

### UseCountdownReturn

| 名称      | 类型                       | 说明             |
| --------- | -------------------------- | ---------------- |
| countdown | _ComputedRef\<Countdown\>_ | 剩余时间         |
| start     | _() => void_               | 开始             |
| stop      | _() => void_               | 暂停             |
| reset     | _()=> void_                | 重置             |
| isRunning | _boolean_                  | 是否正在倒计时中 |

### Countdown

| 名称         | 类型     | 说明             |
| ------------ | -------- | ---------------- |
| total        | _number_ | 总剩余时间(单位：毫秒)       |
| days         | _number_ | 剩余天数             |
| hours        | _number_ | 剩余小时            |
| minutes      | _number_ | 剩余分钟             |
| seconds      | _number_ | 剩余秒数 |
| milliseconds | _number_ | 剩余毫秒 |
