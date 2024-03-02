import { describe, expect, test } from 'vitest'
import { usePagination } from '.'

describe('usePagination', () => {
  test('should be defined', () => {
    expect(usePagination).toBeDefined()
  })

  test('total', () => {
    const { pages } = usePagination({ total: 20 })
    expect(pages.value.length).toEqual(2)
  })

  test('pageSize', () => {
    const { pages } = usePagination({ total: 20, pageSize: 5 })
    expect(pages.value.length).toEqual(4)
  })

  test('init currentPage', () => {
    const { currentPage } = usePagination({
      total: 5,
      pageSize: 1,
      currentPage: 2,
    })
    expect(currentPage.value).toEqual(2)
  })

  test('maxPageCount', () => {
    const { pages } = usePagination({ total: 5, pageSize: 1, maxPageCount: 3 })
    expect(pages.value.length).toEqual(3)
  })

  test('currentPage', () => {
    const { currentPage, nextPage } = usePagination({
      total: 5,
      pageSize: 1,
    })
    expect(currentPage.value).toEqual(1)
    nextPage()
    expect(currentPage.value).toEqual(2)
  })

  test('isFirstPage', () => {
    const { isFirstPage, nextPage, previousPage } = usePagination({
      total: 5,
      pageSize: 1,
    })
    expect(isFirstPage.value).toBeTruthy()
    nextPage()
    expect(isFirstPage.value).toBeFalsy()
    previousPage()
    expect(isFirstPage.value).toBeTruthy()
  })

  test('isLastPage', () => {
    const { isLastPage, nextPage, previousPage, gotoPage } = usePagination({
      total: 5,
      pageSize: 1,
    })
    expect(isLastPage.value).toBeFalsy()
    gotoPage(5)
    expect(isLastPage.value).toBeTruthy()
    previousPage()
    expect(isLastPage.value).toBeFalsy()
    nextPage()
    expect(isLastPage.value).toBeTruthy()
  })

  test('totalPage', () => {
    const { totalPage } = usePagination({
      total: 5,
      pageSize: 1,
    })
    expect(totalPage.value).toEqual(5)
  })

  test('gotoPage', () => {
    const { gotoPage, currentPage } = usePagination({
      total: 5,
      pageSize: 1,
    })
    expect(currentPage.value).toEqual(1)
    gotoPage(3)
    expect(currentPage.value).toEqual(3)
  })

  test('nextPage', () => {
    const { gotoPage, currentPage, nextPage } = usePagination({
      total: 5,
      pageSize: 1,
    })
    expect(currentPage.value).toEqual(1)
    gotoPage(4)
    expect(currentPage.value).toEqual(4)
    nextPage()
    expect(currentPage.value).toEqual(5)
    nextPage()
    expect(currentPage.value).toEqual(5)
  })

  test('previousPage', () => {
    const { currentPage, nextPage, previousPage } = usePagination({
      total: 5,
      pageSize: 1,
    })
    expect(currentPage.value).toEqual(1)
    nextPage()
    expect(currentPage.value).toEqual(2)
    previousPage()
    expect(currentPage.value).toEqual(1)
    previousPage()
    expect(currentPage.value).toEqual(1)
  })

  test('setPageSize', () => {
    const { setPageSize, totalPage } = usePagination({
      total: 5,
      pageSize: 1,
    })
    expect(totalPage.value).toEqual(5)
    setPageSize(2)
    expect(totalPage.value).toEqual(3)
  })

  test('gotoFirstPage and gotoLastPage', () => {
    const { currentPage, gotoFirstPage, gotoLastPage } = usePagination({
      total: 5,
      pageSize: 1,
    })
    expect(currentPage.value).toEqual(1)
    gotoLastPage()
    expect(currentPage.value).toEqual(5)
    gotoFirstPage()
    expect(currentPage.value).toEqual(1)
  })
})
