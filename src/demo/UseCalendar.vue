<script setup lang="ts">
import { ref, h, VNode } from 'vue'
import { useCalendar, Locale } from '@noi/core'

const {
  weekDays,
  currentMonthDays,
  goToToday,
  goToNextMonth,
  goToPreviousMonth,
  goToNextYear,
  goToPreviousYear,
  getDays,
} = useCalendar({
  locale: Locale.CN,
})
</script>

<template>
  <button @click="goToPreviousYear">goToPreviousYear</button>
  <button @click="goToNextYear">goToNextYear</button>
  <br />
  <button @click="goToPreviousMonth">goToPreviousMonth</button>
  <button @click="goToNextMonth">goToNextMonth</button>
  <br />
  <button @click="goToToday">goToToday</button>
  算出当前日历直接提供给开发者 需要生成一个当前日历需要知道哪些信息 1.
  当前的月份有多少天 2. 每天是一个对象，应该会配有不同的内容 3. 周 4. 当前的年月
  5.
  <br />
  {{ weekDays }}
  <br />
  <!-- {{ currentMonthDays }} -->
  <div class="grid grid-cols-7 gap-1 grid-flow-row-dense p-1">
    <div class="text-center" v-for="week in weekDays">{{ week }}</div>
    <template v-for="(days, index) in getDays(2024)" :key="index">
      <div
        class="text-center text-white rounded-md"
        :class="{ 'bg-sky-500': !day.disabled }"
        v-for="day in days"
      >
        <template v-if="!day.disabled">{{ day.name }}</template>
      </div>
    </template>
  </div>
</template>
