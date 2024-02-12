import { describe, expect, test } from 'vitest'
import { useCountdown } from '.'
import { wait } from '../utils'

describe('useEllipsis', () => {
  test('should be defined', () => {
    expect(useCountdown).toBeDefined()
  })

  test('interval', async () => {
    const { countdown } = useCountdown({
      duration: 3000,
      immediate: true,
      interval: 100,
    })
    expect(countdown.value.total).toEqual(3000)
    await wait(100)
    expect(countdown.value.total).toEqual(2900)
  })

  test('immediate', async () => {
    const { countdown } = useCountdown({
      duration: 3000,
      immediate: true,
      interval: 100,
    })
    expect(countdown.value.total).toEqual(3000)
    await wait(100)
    expect(countdown.value.total).toEqual(2900)
  })

  test('control countdown', async () => {
    const { countdown, start, stop, reset } = useCountdown({
      duration: 3000,
      interval: 100,
    })
    expect(countdown.value.total).toEqual(3000)
    start()
    await wait(100)
    expect(countdown.value.total).toEqual(2900)
    stop()
    await wait(100)
    expect(countdown.value.total).toEqual(2900)
    reset()
    await wait(100)
    expect(countdown.value.total).toEqual(3000)
  })

  test('reset with immediate', async () => {
    const { countdown, reset } = useCountdown({
      duration: 3000,
      interval: 100,
      immediate: true,
    })
    await wait(210)
    expect(countdown.value.total).toEqual(2800)
    reset()
    await wait(100)
    expect(countdown.value.total).toEqual(2900)
  })

  test('isRunning', async () => {
    const { start, stop, isRunning } = useCountdown({
      duration: 3000,
      interval: 100,
    })
    expect(isRunning.value).toBeFalsy()
    start()
    await wait(100)
    expect(isRunning.value).toBeTruthy()
    stop()
    await wait(100)
    expect(isRunning.value).toBeFalsy()
  })

  // isRunning: Ref<boolean> // 是否在运行
})
