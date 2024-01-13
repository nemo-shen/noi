import { ref, watchEffect, type Ref } from 'vue'

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

function test() {
  const source =
    '擁擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！擁有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！有正確的座lwjeflwejf右銘，可以幫10230123助你改變心態，自信迎接新的一天，比前一天更好。座右銘能改變你的生活。將勵志名言納入內容，作為文案，用這些金句激勵讀者。讓名言成為你的引領，展翅高飛！'
  const lineHeight = 16

  const div = document.createElement('div')
  // const width = div.style.setProperty('width', `${width}px`)
  div.style.setProperty('line-height', `${lineHeight}px`)
  document.body.appendChild(div)

  let i = 0
  // eslint-disable-next-line @typescript-eslint/no-shadow
  /**
   * 有一个空间，和一个字符串，请问最多能放多少个字符
   * @param content
   */
  function calc(content: string, res = '', tail = '') {
    i++
    console.log(res, '|', content, '|', tail, '|', i)
    if (content.length === 0) return res
    if (content.length === 1) {
      div.innerText = `${res}${content}`
      if (div.clientHeight > lineHeight) {
        div.innerText = res
        return res
      }
      return `${res}${content}`
    }

    const half = content.slice(0, content.length / 2)
    const remain = content.slice(half.length)

    div.innerText = `${res}${half}`
    if (div.clientHeight > lineHeight) {
      div.innerText = res
      return calc(half, res, tail ?? remain)
    }
    return calc(remain + tail, res + half, '')
  }

  const res = calc(source)
  console.log(res)
}
test()
const fontSize = ref<number>(1)
const end = ref<number>(0)
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
  document.body.appendChild(container)

  fontSize.value = parseFloat(container.style.getPropertyValue('font-size'))
  end.value = container.clientWidth / fontSize.value

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
    content: options.content.slice(0, 24),
    state: 'collapse',
    toggle,
  }
}
