import {
  ref,
  type Ref,
  render,
  type VNode,
  watch,
  computed,
  ComputedRef,
  onMounted,
} from 'vue'
import { useWindowSize } from '@vueuse/core'

export enum EllipsisPosition {
  Start = 'start',
  End = 'end',
}

export enum EllipsisState {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
}

interface UseEllipsisOptions {
  content: Ref<string> // 同组件 prop
  rows?: number // 同组件 prop default: 1
  ellipsisText?: string // 同组件 prop default: '...'
  position?: EllipsisPosition // 同组件 prop default 'end'
  action?: (payload: { state: Ref<EllipsisState>; toggle: Function }) => VNode // 操作 VNode则表示自定义slot 传入之后会被计算到字符中
}
interface UseEllipsisReturn {
  content: ComputedRef<string> // 省略后的内容
  state: EllipsisState // 当前状态
  toggle: (e: MouseEvent) => void // 切换状态
}

interface UseCloneElementReturn {
  dupNode: HTMLElement
  unmount: Function
}

/**
 * 存放省略内容的容器需要是一个没有其他元素的干净容器，如果需要在内部增加action，可以通过action option 增加
 * 如果需要控制省略位置可以通过 position option 控制 'left' | 'center' | 'right'(default)
 * 如果需要控制省略符号可以通过 ellipsisText: '...' default
 * @param source
 */
const useCloneElement = (source: HTMLElement): UseCloneElementReturn => {
  const dupNode = source.cloneNode(false) as HTMLElement

  const computedStyle = window.getComputedStyle(source)

  const keys = Array.from(computedStyle)
  keys.forEach((key) => {
    dupNode.style.setProperty(key, computedStyle.getPropertyPriority(key))
  })

  document.body.appendChild(dupNode)

  const unmount = () => {
    document.body.removeChild(dupNode)
  }

  return {
    dupNode,
    unmount,
  }
}

const calcEllipsisText = (
  clone: UseCloneElementReturn,
  sourceContent: string,
  ellipsisText: string,
  position: EllipsisPosition,
  actionNode: VNode,
  rows: number
) => {
  const node = clone.dupNode

  const style = window.getComputedStyle(node)
  const lineHeight = parseFloat(style.lineHeight) * rows
  // 先把 ellipsisText 放到node中进行试算，那么我们就能知道我们至少要留多少空间给ellipsisText，也就是说

  function calc(content: string, res = '', tail = '') {
    if (content.length === 0) return res

    if (content.length === 1) {
      node.innerText = `${res}${content}`
      if (node.clientHeight > lineHeight) {
        node.innerText = res
        return res
      }
      return `${res}${content}`
    }

    const half = content.slice(0, content.length / 2)
    const remain = content.slice(half.length)

    node.innerText = `${res}${half}`
    if (node.offsetHeight > lineHeight) {
      node.innerText = res
      return calc(half, res, tail ?? remain)
    }
    return calc(remain + tail, res + half, '')
  }

  function withEllipsisText(content: string) {
    node.innerText = ''
    const newContent = content.slice(0, content.length - 1)
    switch (position) {
      case EllipsisPosition.Start:
        node.innerText = ellipsisText + content
        break
      case EllipsisPosition.End:
        node.innerText = content + ellipsisText
        break
      default:
        node.innerText = content + ellipsisText
        break
    }
    if (node.offsetHeight > lineHeight) {
      return withEllipsisText(newContent)
    }
    return node.innerText
  }

  function withAction(content: string) {
    node.innerText = content
    const dummyNode = document.createElement('div')
    render(actionNode, dummyNode)
    node.appendChild(dummyNode.firstChild)
    if (node.offsetHeight > lineHeight) {
      let newContent
      switch (position) {
        case EllipsisPosition.Start:
          newContent = ellipsisText + content.slice(1 + ellipsisText.length)
          break
        case EllipsisPosition.End:
          newContent =
            content.slice(0, content.length - 1 - ellipsisText.length) +
            ellipsisText
          break
        default:
          newContent =
            content.slice(0, content.length - 1 - ellipsisText.length) +
            ellipsisText
          break
      }
      return withAction(newContent)
    }
    return content
  }

  let res = calc(sourceContent)
  if (ellipsisText.length !== 0) {
    res = withEllipsisText(res)
  }
  if (actionNode) {
    res = withAction(res)
  }

  clone.unmount()
  return res
}

const defaultUseEllipsisOptions = {
  rows: 1,
  ellipsisText: '...',
  position: EllipsisPosition.End,
}

export const useEllipsis = (
  source: Ref<HTMLElement>,
  options: UseEllipsisOptions
): UseEllipsisReturn => {
  // eslint-disable-next-line no-param-reassign
  options = { ...defaultUseEllipsisOptions, ...options }
  const ellipsisContent = ref('')
  const state = ref(EllipsisState.Collapsed)
  const clone = ref<UseCloneElementReturn>()

  const toggle = () => {
    state.value =
      state.value === EllipsisState.Collapsed
        ? EllipsisState.Expanded
        : EllipsisState.Collapsed
  }

  const reCalculate = () => {
    if (!source.value) return
    clone.value = useCloneElement(source.value)
    ellipsisContent.value = calcEllipsisText(
      clone.value,
      options.content.value,
      options.ellipsisText,
      options.position,
      options.action ? options.action({ state, toggle }) : undefined,
      options.rows
    )
  }

  onMounted(reCalculate)

  const { width } = useWindowSize()
  watch([width, options.content, source], reCalculate)

  const content = computed(() =>
    state.value === EllipsisState.Collapsed
      ? ellipsisContent.value
      : options.content.value
  )

  return {
    content,
    state: EllipsisState.Collapsed,
    toggle,
  }
}
