import { ref, createApp, type Component, Teleport, getCurrentInstance } from 'vue'

interface UseToastOptions {
  duration?: number
}
interface OpenOptions {
  message: string
}

const mountRootComponent = (Root: Component) => {
  const app = createApp(Root)
  const root = document.createElement('div')
  document.body.appendChild(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    },
  }
}

export const useToast = (_source = ref([]), _options: UseToastOptions = {}) => {
  console.log('nemo useToast', getCurrentInstance())
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
  mountRootComponent({
    setup() {
      const count = ref(0)
      return () => (
        <teleport>
          <div>nemo: {count.value}</div>
        </teleport>
      )
      // (getCurrentInstance() as any).render = render
      // return {}
    },
  })
  const close = () => {}
  const open = (_openOptions: OpenOptions | string) => {}
  return {
    open,
    close,
  }
}

export const sum = (a, b) => a + b
