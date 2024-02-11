import { ref, type Ref, watch, computed } from 'vue'

interface UseCountdownOptions {
  duration: number
  interval?: number
  immediate?: boolean
}

interface Countdown {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

interface UseCountdownReturn {
  countdown: Ref<Countdown>
  start: () => void // 开始
  stop: () => void // 暂停
  reset: () => void // 重置
  isRunning: Ref<boolean> // 是否在运行
}

export const useCountdown = (
  options: UseCountdownOptions
): UseCountdownReturn => {
  const { duration, interval = 1000, immediate = false } = options
  const remainingTime = ref(duration)
  const isRunning = ref(false)
  let timer: number

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer)
    }
  }

  const start = () => {
    if (isRunning.value) {
      console.warn('Countdown has already running')
      return
    }
    isRunning.value = true
    timer = setInterval(() => {
      const time = remainingTime.value - interval;
      remainingTime.value = time >= 0 ? time : 0
    }, interval) as unknown as number
  }
  const stop = () => {
    isRunning.value = false
    clearTimer()
  }
  const reset = () => {
    if (immediate) {
      remainingTime.value = duration
    } else {
      clearTimer()
      isRunning.value = false
      remainingTime.value = duration
    }
  }

  if (immediate) {
    start()
  }

  const countdown = computed(() => {
    const milliseconds = remainingTime.value
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(milliseconds / 1000 / 60)
    const hours = Math.floor(milliseconds / 1000 / 60 / 60)
    const days = Math.floor(milliseconds / 1000 / 60 / 60 / 24)
    return {
      total: milliseconds,
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
      milliseconds: milliseconds % 1000,
    }
  })

  watch(remainingTime, (value) => {
    if (value === 0) {
      if (timer) clearInterval(timer)
    }
  })

  return {
    countdown,
    isRunning,
    start,
    stop,
    reset,
  }
}
