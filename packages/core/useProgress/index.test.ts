import { vi, describe, expect, test } from 'vitest'
import { useProgress } from '.'
import { wait } from '../utils'

describe('useProgress', () => {
  test('should be defined', () => {
    expect(useProgress).toBeDefined()
  })

  test('should increment correctly', () => {
    const { progress, increment } = useProgress()
    increment()
    expect(progress.value).toBe(1)

    increment(101)
    expect(progress.value).toBe(100)
  })

  test('should decrement correctly', () => {
    const { progress, decrement } = useProgress({ initialValue: 10 })

    decrement()
    expect(progress.value).toBe(9)

    decrement(10)
    expect(progress.value).toBe(0)
  })

  test('should progress correctly with maxValue', () => {
    const { progress, increment } = useProgress({ maxValue: 1000 })

    increment()
    expect(progress.value).toBe(0.1)
  })

  test('should onChange called after change progress', async () => {
    const onChange = vi.fn()

    const { increment } = useProgress({ onChange })

    await increment()
    expect(onChange).toHaveBeenCalledTimes(1)

    await increment(100)
    expect(onChange).toHaveBeenCalledTimes(2)

    await increment(100)
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  test('should auto increment progress', async () => {
    const { progress, startAutoIncrement } = useProgress({
      autoIncrementRules: [{ before: 100, delay: 1, increment: 1 }],
    })

    expect(progress.value).toBe(0)

    startAutoIncrement()

    await wait(200)
    expect(progress.value).toBe(99)
  })

  test('should reset progress', async () => {
    const { progress, increment, reset } = useProgress()

    increment()
    expect(progress.value).toBe(1)

    reset()
    expect(progress.value).toBe(0)
  })

  test('should isComplete correctly', async () => {
    const { isComplete, increment } = useProgress()

    expect(isComplete.value).toBeFalsy()

    increment(100)
    expect(isComplete.value).toBeTruthy()
  })
})
