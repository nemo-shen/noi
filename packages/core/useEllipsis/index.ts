import { watch, watchEffect, type Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

interface UseEllipsisOptions {
  rows?: number // 同组件 prop default: 1
  content: string // 同组件 prop
  dots?: string // 同组件 prop default: '...'
  position?: 'start' | 'middle' | 'end' // 同组件 prop default 'end'
}
interface UseEllipsisReturn {
  content: string // 省略后的内容
  state: 'expand' | 'collapse' // 当前状态
  toggle: Function // 切换状态
}
const cloneElement = (target: HTMLElement): HTMLElement => {
  const originStyle = window.getComputedStyle(target)
  const container = document.createElement('div')
  const styleNames: string[] = Array.prototype.slice.apply(originStyle)
  styleNames.forEach((name) => {
    container.style.setProperty(name, originStyle.getPropertyValue(name))
  })

  container.style.position = 'fixed'
  container.style.zIndex = '-9999'
  container.style.top = '-9999px'
  container.style.height = 'auto'
  container.style.minHeight = 'auto'
  container.style.maxHeight = 'auto'

  return container
}

// eslint-disable-next-line import/prefer-default-export
export const useEllipsis = (
  target: Ref<HTMLElement>,
  options: UseEllipsisOptions
): UseEllipsisReturn => {
  // const { width } = useWindowSize()
  watchEffect(() => {
    if (target.value) {
      const cloneTarget = cloneElement(target.value)
      cloneTarget.innerText = options.content
    }
  })

  const toggle = () => {}
  return {
    content: options.content.slice(0, 10),
    state: 'collapse',
    toggle,
  }
}
