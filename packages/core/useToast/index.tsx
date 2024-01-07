import { ref, type Ref, createApp, Component, isVNode } from 'vue'

interface UseToastOptions {
  duration?: number
  root?: Component
}

interface OpenOptions {
  content?: string | Component
}

const stack = new Set()

const createInstance = () => {
  const app = createApp({
    setup(_, { expose }) {
      const show = ref(false)
      const message: Ref<string | Component> = ref('')
      const open = (options: string | OpenOptions) => {
        show.value = true
        if (typeof options === 'string' || isVNode(options)) {
          message.value = options
        } else if (options.content) {
          message.value = options.content
          console.log('message', message.value)
        }
      }
      const close = () => {
        show.value = false
      }

      expose({ open, close })

      return () => <div v-show={show.value}>{message.value}</div>
    },
  })
  const root = document.createElement('div')
  document.body.appendChild(root)
  const instance = app.mount(root)
  return instance
}

const getInstance = () => {
  if (stack.size === 0) {
    const instance = createInstance()
    return instance
  }
  return stack.values().next().value
}

export const unuse = () => {}

/**
 * ```js
 * mountRootComponent({ setup() {} })
 * mountRootComponent(App.vue)
 * mountRootComponent(App.tsx)
 * ```
 * const { open } = useToast()
 * 0. 所有的实例都挂在 app 实例中?
 * 1. 先判断是否有 toast 实例
 * 2. 如果没有则创建实例
 * 3. 返回必要的方法，并响应式 content 并不是 important message
 * 4. call open 则会展示，如果没传duration默认3秒
 * 5. call close 手动关闭 toast
 * open('text')
 * open(options)
 * open(Component)
 */
export const useToast = (_options: UseToastOptions = {}) => {
  const { open, close } = getInstance()
  return {
    open,
    close,
  }
}