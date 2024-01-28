<script setup lang="ts">
import { ref, h, VNode } from 'vue'
import { useCalendar } from '@noi/core'

const { currentMonthDays, goToNextMonth, goToPreviousMonth } = useCalendar()
</script>

<template>
  <button @click="goToPreviousMonth">prev month</button>
  <button @click="goToNextMonth">next month</button>
  需要生成一个当前日历需要知道哪些信息 1. 当前的月份有多少天 2.
  每天是一个对象，应该会配有不同的内容 3. 周 4. 当前的年月 5.

  {{ currentMonthDays }}
</template>
