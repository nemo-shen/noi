interface UseToastOptions {
  duration?: number;
}
interface OpenOptions {
  message: string;
}
export const useToast = (source, options: UseToastOptions = {}) => {
  const close = () => {

  }
  const open = (options: OpenOptions | string) => {

  }
  return {
    open,
    close,

  }
}

export function sum(a, b) {
  return a + b;
}