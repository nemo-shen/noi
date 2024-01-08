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

// eslint-disable-next-line import/prefer-default-export
export const useEllipsis = (
  _el: HTMLElement,
  _options: UseEllipsisOptions
): UseEllipsisReturn => {
  const toggle = () => {}
  return {
    content: '',
    state: 'collapse',
    toggle,
  }
}
