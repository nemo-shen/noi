import { ref, nextTick } from 'vue'
import { describe, expect, it, test, beforeAll, afterAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { useEllipsis } from '.'
// basic usage
//
/**
 * 1. 正常渲染
 * 3. content & ellipsisContent
 * 4. custom ellipsisText
 * 5. position
 * 6. rows
 * 7. 响应式，改变窗口resize，或者响应式容器，或者改变content
 * 8. 不同的行号 & 不同的字体大小
 */
const originGetComputedStyle = window.getComputedStyle

const lineHeight = 20

const content = 'NOI is a hight performance/light weight headless UI library.'

beforeAll(() => {
  window.getComputedStyle = (el) => ({
    ...originGetComputedStyle(el),
    get lineHeight() {
      return `${lineHeight}px`
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      if (this.innerText.length < 10) {
        return lineHeight
      }
      if (this.innerText.includes('...')) {
        const row = Math.ceil(
          (this.innerText.replace(/\.\.\./g, '中').length / content.length) * 4
        )
        return lineHeight * row
      }
      return lineHeight * 4
    },
    set() {},
    configurable: true,
  })
})

afterAll(() => {
  window.getComputedStyle = originGetComputedStyle
})

describe('useEllipsis', () => {
  it('should be defined', () => {
    expect(useEllipsis).toBeDefined()
  })

  test('should ', async () => {
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
})
