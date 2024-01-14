# useProgress

## 用法

### 基础用法

```ts
<script setup lang="ts">
import { useProgress } from '@noi/core'

const { progress, increment } = useProgress()
</script>
```

```html
<template>
  <p>当前进度{{ progress }}%</p>
  <p><template v-for="i in progress">|</template></p>
  <button @click="increment()">increment</button>
</template>
```

### 自定义初始值

```ts
<script setup lang="ts">
import { useProgress } from '@noi/core'

const { progress } = useProgress({ initialValue: 30 })
</script>
```

```html
<template>
  <p>当前进度{{ progress }}%</p>
  <p><template v-for="i in progress">|</template></p>
</template>
```

### 设置最大值

```ts
<script setup lang="ts">
import { useProgress } from '@noi/core'

const { progress, increment } = useProgress({ maxValue: 1000 })
</script>
```

```html
<template>
  <p>当前进度{{ progress }}%</p>
  <p><template v-for="i in Math.floor(progress)">|</template></p>
  <button @click="increment(1)">increment</button>
</template>
```

### 判断进度条是否完成

```ts
<script setup lang="ts">
import { useProgress } from '@noi/core'

const { isComplete, progress, increment } = useProgress()
</script>
```

```html
<template>
  <p>当前进度{{ progress }}%</p>
  <p>当前进度是否完成：{{ isComplete }}</p>
  <p><template v-for="i in Math.floor(progress)">|</template></p>
  <button @click="increment(50)">increment</button>
</template>
```

### 监听进度变化

```ts
<script setup lang="ts">
import { useProgress } from '@noi/core'

const { increment } = useProgress({
  onChange: (progress) => {
    console.log('进度变化:', progress);
  }
})
</script>
```

```html
<template>
  <button @click="increment()">increment</button>
</template>
```

### 自动增长进度

```ts
<script setup lang="ts">
import { useProgress } from '@noi/core'

const { progress, startAutoIncrement } = useProgress({
  autoIncrementRules: [
    { before: 30, delay: 100, increment: 2 },
    { before: 50, delay: 500, increment: 1 },
    { before: 70, delay: 300, increment: 3 },
  ],
})
</script>
```

```html
<template>
  <p>当前进度{{ progress }}%</p>
  <p><template v-for="i in progress">|</template></p>
  <button @click="startAutoIncrement()">auto increment</button>
</template>
```

## 类型定义

### UseProgressOptions

| 名称               | 类型                                        | 默认值 | 是否必传 | 说明                   |
| ------------------ | ------------------------------------------- | ------ | -------- | ---------------------- |
| initialValue       | _number_                                    | 0      | [ ]      | 初始进度值             |
| maxValue           | _number_                                    | 100    | [ ]      | 最大进度值             |
| onChange           | _(currentValue: number) => void_            | -      | [ ]      | 当进度变化时都回调函数 |
| autoIncrementRules | [_AutoIncrementRule[]_](#autoincrementrule) | []     | [ ]      | 自动增长进度规则       |

### AutoIncrementRule

| 名称      | 类型     | 默认值 | 是否必传 | 说明                             |
| --------- | -------- | ------ | -------- | -------------------------------- |
| before    | _number_ | -      | [x]      | 在进度值到达 _before_ 之前的规则 |
| increment | _number_ | -      | [x]      | 每次自动增长进度值               |
| delay     | _number_ | -      | [x]      | 每次自动增长间隔时间             |

### UseProgressReturn

| 名称               | 类型                          | 说明             |
| ------------------ | ----------------------------- | ---------------- |
| progress           | _ComputedRef\<number\>_       | 当前进度百分比   |
| increment          | _(value: number = 1) => void_ | 增加进度         |
| decrement          | _(value: number = 1) => void_ | 减少进度         |
| isComplete         | _ComputedRef\<boolean\>_      | 是否完成         |
| reset              | _() => void_                  | 重置进度         |
| startAutoIncrement | _() => void_                  | 开始自动增长进度 |
