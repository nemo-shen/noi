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

/**
 * 1. 计算百分比 0...100
 * 3. 提供step能力，可以动态管理进度，但最终的finish需要明确告知
 * 6. 提供进度条描述文案 [{ value: 10, text: '111'}, { value: 20, text: '222' }]
 * 7. 提供onChange option，当进度变化时，会将进度返回，开发者可以通过这个callback做其他额外处理
 */
export const useProgress = (options: UseProgressOptions = {}) => {
  const {
    initialValue = 0,
    maxValue = 100,
    autoIncrementRules = [],
    onChange,
  } = options
  const progress = ref(initialValue)

  const setProgress = (value: number = 1) => {
    progress.value = Math.min(maxValue, Math.max(0, value))
  }

  const increment = (value: number = 1) => {
    if (progress.value >= maxValue) return
    progress.value = Math.min(maxValue, progress.value + value)
  }

  const decrement = (value: number) => {
    if (progress.value <= 0) return
    progress.value = Math.min(0, progress.value - value)
  }

  const reset = () => {
    progress.value = initialValue
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
    setProgress,
    increment,
    decrement,
    isComplete,
    reset,
    startAutoIncrement,
  }
}

export type UseProgressReturn = ReturnType<typeof useProgress>
