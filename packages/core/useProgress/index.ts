import { watch, computed, ref } from 'vue'
// interface UseWindowSizeOptions

export interface UseProgressOptions {
  initialValue?: number // 0
  maxValue?: number // default 100
  onChange?: (currentValue: number) => void
  autoIncrementRules?: AutoIncrementRule[]
}

interface AutoIncrementRule {
  before: number // 多少进度之前
  increment: number // 自动增长幅度，默认 1
  delay: number // 延迟多久
}

const DEFAULT_AUTO_INCREMENT_RULE: AutoIncrementRule = {
  before: 100,
  increment: 1,
  delay: 1000,
}

export const useProgress = (options: UseProgressOptions = {}) => {
  const {
    initialValue = 0,
    maxValue = 100,
    autoIncrementRules = [],
    onChange,
  } = options
  const currentValue = ref(0)
  const progress = computed(() =>
    parseFloat(((currentValue.value / maxValue) * 100).toFixed(2))
  )

  const increment = (value: number = 1) => {
    if (currentValue.value >= maxValue) return
    currentValue.value = Math.min(maxValue, currentValue.value + value)
  }

  const decrement = (value: number) => {
    if (currentValue.value <= 0) return
    currentValue.value = Math.min(0, currentValue.value - value)
  }

  const reset = () => {
    currentValue.value = initialValue
  }

  const matchRule = () => {
    if (autoIncrementRules.length === 0) return DEFAULT_AUTO_INCREMENT_RULE
    return (
      autoIncrementRules.find((_) => progress.value <= _.before) ??
      autoIncrementRules[autoIncrementRules.length - 1]
    )
  }

  const delay = computed(() => {
    const rule = matchRule()
    if (rule) {
      return rule.delay
    }
    return DEFAULT_AUTO_INCREMENT_RULE.delay
  })

  const timer = ref()

  const startAutoIncrement = () => {
    if (progress.value >= maxValue) return
    if (progress.value >= 99) return
    timer.value = setTimeout(() => {
      if (timer.value) {
        clearTimeout(timer.value)
      }
      const rule = matchRule()
      increment(rule.increment)
      startAutoIncrement()
    }, delay.value)
  }

  watch(progress, (newValue) => {
    if (onChange) {
      onChange(newValue)
    }
  })

  const isComplete = computed(() => progress.value >= maxValue)

  return {
    progress,
    increment,
    decrement,
    isComplete,
    reset,
    startAutoIncrement,
  }
}

export type UseProgressReturn = ReturnType<typeof useProgress>
