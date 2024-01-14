import { ref, type Ref } from 'vue'

interface UseLoadingReturn {
  isLoading: Ref<boolean>
  start: () => void
  stop: () => void
}

export const useLoading = (): UseLoadingReturn => {
  const isLoading = ref(false)

  const start = () => {
    isLoading.value = true
  }

  const stop = () => {
    isLoading.value = false
  }

  return {
    isLoading,
    start,
    stop,
  }
}
