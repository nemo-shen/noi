import { ref, nextTick } from 'vue'
import { describe, expect, test, beforeAll, afterAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { EllipsisPosition, useEllipsis } from '.'

const originGetComputedStyle = window.getComputedStyle

const lineHeight = 20

const content = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

beforeAll(() => {
  window.getComputedStyle = (el) => ({
    ...originGetComputedStyle(el),
    get lineHeight() {
      return `${lineHeight}px`
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      const rows = Math.ceil(this.innerText.length / 10)
      return lineHeight * rows
    },
    set() {},
    configurable: true,
  })
})

afterAll(() => {
  window.getComputedStyle = originGetComputedStyle
})

describe('useEllipsis', () => {
  test('should be defined', () => {
    expect(useEllipsis).toBeDefined()
  })

  test('should be ellipsis correctly', async () => {
    const wrapper = mount({
      setup() {
        const sourceContent = ref(content)
        const ellipsisRef = ref<HTMLElement>()
        const { content: ellipsisContent } = useEllipsis(ellipsisRef, {
          content: sourceContent,
        })
        return () => <div ref={ellipsisRef}>{ellipsisContent.value}</div>
      },
    })

    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should use custom ellipsisText', async () => {
    const wrapper = mount({
      setup() {
        const sourceContent = ref(content)
        const ellipsisRef = ref<HTMLElement>()
        const { content: ellipsisContent } = useEllipsis(ellipsisRef, {
          content: sourceContent,
          ellipsisText: ' etc.',
        })
        return () => <div ref={ellipsisRef}>{ellipsisContent.value}</div>
      },
    })

    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should be ellipsis at start', async () => {
    const wrapper = mount({
      setup() {
        const sourceContent = ref(content)
        const ellipsisRef = ref<HTMLElement>()
        const { content: ellipsisContent } = useEllipsis(ellipsisRef, {
          content: sourceContent,
          position: EllipsisPosition.Start,
        })
        return () => <div ref={ellipsisRef}>{ellipsisContent.value}</div>
      },
    })

    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should be ellipsis from 2 rows', async () => {
    const wrapper = mount({
      setup() {
        const sourceContent = ref(content)
        const ellipsisRef = ref<HTMLElement>()
        const { content: ellipsisContent } = useEllipsis(ellipsisRef, {
          content: sourceContent,
          rows: 2,
        })
        return () => <div ref={ellipsisRef}>{ellipsisContent.value}</div>
      },
    })

    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
