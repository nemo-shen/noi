import { ref, computed, type ComputedRef, type Ref } from 'vue'

interface PageItem {
  text: string | number
  value: number
  isCurrent: boolean
  type: 'page'
}

interface UsePaginationOption {
  total: number
  pageSize?: number
  currentPage?: number
  maxPageCount?: number
}

interface UsePaginationReturn {
  currentPage: Ref<number>
  isFirstPage: ComputedRef<boolean>
  isLastPage: ComputedRef<boolean>
  pages: ComputedRef<PageItem[]>
  totalPage: ComputedRef<number>
  gotoPage: (page: number) => void
  nextPage: () => void
  previousPage: () => void
  setPageSize: (pageSize: number) => void
  gotoFirstPage: () => void
  gotoLastPage: () => void
}

export const usePagination = (
  options: UsePaginationOption
): UsePaginationReturn => {
  const { total } = options

  const currentPage = ref(options.currentPage || 1)
  const pageSize = ref(options.pageSize || 10)
  const isFirstPage = computed(() => currentPage.value === 1)
  const totalPage = computed(() => Math.ceil(total / pageSize.value))
  const maxPageCount =
    (options.maxPageCount || 5) > totalPage.value
      ? totalPage.value
      : options.maxPageCount || 5
  const isLastPage = computed(() => currentPage.value === totalPage.value)
  const pages = computed(() =>
    Array.from({ length: maxPageCount }, (_, index) => ({
        text: index + 1,
        value: index + 1,
        isCurrent: index + 1 === currentPage.value,
        type: 'page',
      } as PageItem))
  )

  const gotoPage = (page: number) => {
    currentPage.value = page
  }

  const nextPage = () => {
    if (currentPage.value === totalPage.value) return
    currentPage.value += 1
  }

  const previousPage = () => {
    if (currentPage.value === 1) return
    currentPage.value -= 1
  }

  const setPageSize = (newPageSize: number) => {
    pageSize.value = newPageSize
  }

  const gotoFirstPage = () => {
    currentPage.value = 1
  }

  const gotoLastPage = () => {
    currentPage.value = totalPage.value
  }

  return {
    currentPage,
    isFirstPage,
    isLastPage,
    totalPage,
    pages,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    gotoFirstPage,
    gotoLastPage,
  }
}
