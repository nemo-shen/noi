import { watch, computed, ref } from 'vue'
// interface UseWindowSizeOptions

export interface UseProgressOptions {
  initialValue?: number // 0
  maxValue?: number // default 100
  onChange?: (currentValue: number) => void
}

/**
 * 1. 计算百分比 0...100
 * 3. 提供step能力，可以动态管理进度，但最终的finish需要明确告知
 * 6. 提供进度条描述文案 [{ value: 10, text: '111'}, { value: 20, text: '222' }]
 * 7. 提供onChange option，当进度变化时，会将进度返回，开发者可以通过这个callback做其他额外处理
 */
export const useProgress = (options: UseProgressOptions) => {
  const { initialValue = 0, maxValue = 100, onChange } = options
  const progress = ref(initialValue)

  const setProgress = (value: number) => {
    progress.value = Math.min(maxValue, Math.max(0, value))
  }

  const reset = () => {
    progress.value = initialValue
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
    isComplete,
    reset,
  }
}

export type UseProgressReturn = ReturnType<typeof useProgress>
