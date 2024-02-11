import { ref, type Ref } from 'vue'

interface UseCountdownOptions {
  duration: number
  interval?: number
  immediate?: boolean
  onComplete: () => {}
}

interface Countdown {
  readonly value: number // 总时间
  format: 'HH:mm:ss'
  setValue: () => {}
  getYears: () => {}
  getMonths: () => {}
  getDays: () => {}
  getMinutes: () => {}
  getHours: () => {}
  getSeconds: () => {}
  getMilliseconds: () => {}
}

interface UseCountdownReturn {
  countdown: Ref<Countdown>
  start: () => void // 开始
  pause: () => void // 暂停
  reset: () => void // 重置
  isRunning: Ref<boolean> // 是否在运行
}

export const useCountdown = (
  options?: UseCountdownOptions
): UseCountdownReturn => {
  const { duration, interval = 1000, immediate = false, onComplete } = options
  console.log(duration, interval, immediate, onComplete)
  const countdown = ref<Countdown>()

  const start = () => {}
  const pause = () => {}
  const reset = () => {}

  const isRunning = ref(false);

  return {
    countdown,
    isRunning,
    start,
    pause,
    reset,
  }
}
