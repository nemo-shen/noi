import { test, describe, expect } from 'vitest'
import { useLoading } from '.'

describe('useLoading', () => {
  test('should be defined', () => {
    expect(useLoading).toBeDefined()
  })

  test('should be loading correctly', () => {
    const { isLoading, start, stop } = useLoading()

    expect(isLoading.value).toBeFalsy()

    start()
    expect(isLoading.value).toBeTruthy()

    stop()
    expect(isLoading.value).toBeFalsy()
  })
})
