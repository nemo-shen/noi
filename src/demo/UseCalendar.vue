<script setup lang="ts">
import { watch, ref, h, VNode } from 'vue'
import { useCalendar, Locale } from '@noi/core'

const {
  weekDays,
  currentMonth,
  currentYear,
  currentYearDays,
  currentMonthDays,
  goToToday,
  goToNextMonth,
  goToPreviousMonth,
  goToNextYear,
  goToPreviousYear,
  selectedDate,
  setSelectDate,
} = useCalendar({
  locale: Locale.CN,
  selectType: 'range'
})
</script>

<template>
  {{ selectedDate }}
  <div class="flex gap-1">
    <button
      @click="goToPreviousYear"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      上一年
    </button>
    <button
      @click="goToPreviousMonth"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      上月
    </button>
    <span class="h-10 flex items-center justify-center"
      >{{ currentYear }} - {{ currentMonth }}</span
    >
    <button
      @click="goToNextMonth"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      下月
    </button>
    <button
      @click="goToNextYear"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      下一年
    </button>

    <button
      @click="goToToday"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      今天
    </button>
  </div>
  <div class="grid grid-cols-7 gap-1 grid-flow-row-dense p-1">
    <div class="text-center" v-for="week in weekDays">{{ week }}</div>
    <template v-for="days in currentMonthDays">
      <div
        class="col-span-1 w-full h-14 text-center rounded-md align-middle flex items-center justify-center"
        @click="setSelectDate(day.value)"
        :class="[
          day.selected
            ? ['bg-blue-500', 'text-white']
            : day.disabled
              ? ['text-gray-300']
              : ['hover:bg-blue-50', 'hover:text-blue-500'],
          {
            'cursor-pointer': !day.disabled,
          },
        ]"
        v-for="day in days"
      >
        {{ day.name }}{{ day.selected }}
      </div>
    </template>
  </div>
</template>
