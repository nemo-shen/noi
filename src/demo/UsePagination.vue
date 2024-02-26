<script setup lang="ts">
import { usePagination } from '@noi/core'

const {
  totalPage,
  pages,
  gotoPage,
  setPageSize,
  gotoFirstPage,
  gotoLastPage,
  previousPage,
  nextPage,
  currentPage,
} = usePagination({
  total: 100,
  ellipsis: true,
})
</script>

<template>
  <div @click="gotoFirstPage">首页</div>
  <div @click="gotoPage(page)" :key="page" v-for="page in pages">
    {{ page }}
  </div>
  <div @click="gotoLastPage">尾页</div>
  // 重新设置 pageSize
  <div>总计: {{ totalPage }}</div>
  <nav
    class="isolate inline-flex -space-x-px rounded-md shadow-sm"
    aria-label="Pagination"
  >
    <a
      href="#"
      class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
      <span class="sr-only" @click="previousPage">上一页</span>
      <svg
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
    <template v-for="page in pages" :key="page.value">
      <a
        v-if="page.type === 'page'"
        v-show="page.value === currentPage"
        @click="gotoPage(page.value)"
        href="#"
        aria-current="page"
        class="relative inline-flex items-center z-10 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >{{ page.text }}</a
      >
      <span
        v-if="page.type === 'ellipsis'"
        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        >...</span
      >
      <a
        v-if="page.type === 'page'"
        v-show="page.value !== currentPage"
        @click="gotoPage(page.value)"
        href="#"
        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >{{ page.text }}</a
      >
    </template>
    <a
      href="#"
      class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
      <span class="sr-only" @click="nextPage">下一页</span>
      <svg
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  </nav>
</template>
