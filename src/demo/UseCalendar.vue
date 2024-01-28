<script setup lang="ts">
import { ref, h, VNode } from 'vue'
import { useCalendar } from '@noi/core'

const {
  currentMonthDays,
  goToToday,
  goToNextMonth,
  goToPreviousMonth,
  goToNextYear,
  goToPreviousYear,
} = useCalendar()
</script>

<template>
  <button @click="goToPreviousYear">goToPreviousYear</button>
  <button @click="goToNextYear">goToNextYear</button>
  <br />
  <button @click="goToPreviousMonth">goToPreviousMonth</button>
  <button @click="goToNextMonth">goToNextMonth</button>
  <br />
  <button @click="goToToday">goToToday</button>
  需要生成一个当前日历需要知道哪些信息 1. 当前的月份有多少天 2.
  每天是一个对象，应该会配有不同的内容 3. 周 4. 当前的年月 5.

  {{ currentMonthDays }}
</template>
