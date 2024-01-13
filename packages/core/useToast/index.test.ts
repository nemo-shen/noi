import { expect, test } from 'vitest'
import { useToast } from '@noi/core'

test('should be call', () => {
  const { open } = useToast()
  expect(open).toBeTypeOf('function')
})
