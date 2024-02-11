# UseCountdown

## Example

### Basic Usage

```ts
<script setup lang="ts">
import { useCountdown } from '@noi/core'

const { countdown, start } = useCountdown({ duration: 10 * 1000 })
</script>
```

```html
<template>
  {{ countdown }}
  <button @click="start">start</button>
</template>
```

### Immediate start

```ts
<script setup lang="ts">
import { useCountdown } from '@noi/core'

const { countdown } = useCountdown({ duration: 10 * 1000, immediate: true })
</script>
```

```html
<template>{{ countdown }}</template>
```

### Custom interval

You can customize the update frequency by setting the `interval`, allowing for a countdown precise to the milliseconds.

```ts
<script setup lang="ts">
import { useCountdown } from '@noi/core'

const { countdown } = useCountdown({ duration: 10 * 1000, interval: 100, immediate: true })
</script>
```

```html
<template>{{ countdown }}</template>
```

### Check if the countdown has ended.

Since the `countdown` is reactive, you can tell if it's finished by checking if `countdown.total` equals zero.

```ts
<script setup lang="ts">
import { computed } from 'vue'
import { useCountdown } from '@noi/core'

const { countdown } = useCountdown({ duration: 10 * 1000, interval: 100, immediate: true })
const isComplete = computed(() => countdown.total === 0)
</script>
```

```html
<template> {{ countdown }} complete: {{ isComplete }} </template>
```

### Control Countdown

We've got a few handy functions ready for managing the countdown. Just a heads up, if you've got `immediate: true` set up, the countdown will keep going even after you hit `reset()`.

```ts
<script setup lang="ts">
import { useCountdown } from '@noi/core'

const { countdown, start, stop, reset } = useCountdown({ duration: 10 * 1000, interval: 100 })
</script>
```

```html
<template>
  {{ countdown }}
  <button @click="start">start</button>
  <button @click="stop">stop</button>
  <button @click="reset">reset</button>
</template>
```

## Types

### UseCountdownOptions

| Name      | Type      | Default | Require | Description                                |
| --------- | --------- | ------- | ------- | ------------------------------------------ |
| duration  | _number_  | -       | [x]     | Total time(unit: milliseconds)             |
| interval  | _number_  | 1000    | [ ]     | Update frequency                           |
| immediate | _boolean_ | _false_ | [ ]     | Whether to start the countdown right away. |

### UseCountdownReturn

| Name      | Type                       | Description                           |
| --------- | -------------------------- | ------------------------------------- |
| countdown | _ComputedRef\<Countdown\>_ | Remaining time                        |
| start     | _() => void_               | start                                 |
| stop      | _() => void_               | stop                                  |
| reset     | _()=> void_                | reset                                 |
| isRunning | _boolean_                  | Whether it's currently counting down. |

### Countdown

| 名称         | 类型     | 说明                                     |
| ------------ | -------- | ---------------------------------------- |
| total        | _number_ | Total remaining time(unit: milliseconds) |
| days         | _number_ | remaining days                           |
| hours        | _number_ | remaining hours                          |
| minutes      | _number_ | remaining minutes                        |
| seconds      | _number_ | remaining seconds                        |
| milliseconds | _number_ | remaining milliseconds                   |
