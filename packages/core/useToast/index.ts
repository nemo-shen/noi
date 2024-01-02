interface UseToastOptions {
  duration?: number
}
interface OpenOptions {
  message: string
}

export const useToast = (source, _options: UseToastOptions = {}) => {
  const close = () => {}
  const open = (_openOptions: OpenOptions | string) => {}
  return {
    open,
    close,
  }
}

export const sum = (a, b) => a + b
