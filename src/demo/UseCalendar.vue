<script setup lang="ts">
import { ref, h, VNode } from 'vue'
import { useCalendar } from '@noi/core'

const { currentMonthDays } = useCalendar()
</script>

<template>
  {{ currentMonthDays }}
</template>
