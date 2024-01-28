import { ref, computed } from 'vue'
/**
 * 1. 首先需要初始化一个日历给开发者
 * 2. minDate 默认当月1号
 * 3. maxDate 默认12个月之后的最后一天
 * [
 * -10
 * year -> month -> day
 * +10
 * ]
 */

enum Week {
  SUN = 0,
  MON = 1,
  TUE = 2,
  WED = 3,
  THU = 4,
  FRI = 5,
  SAT = 6,
}

interface Day {
  name: number
  value: Date
  week: Week
  type: 'current' | 'fill'
  disabled: boolean
  selected: boolean
}

export enum Locale {
  EN = 'en-US',
  CN = 'zh-CN',
}

interface UseCalendarOptions {
  initialDate?: Date // 默认当日
  locale?: Locale // 默认当地
  firstDayOfWeek?: 0 // 默认 周日 = 0
}

const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
const getDays = (year: number, month: number) => {
  const longMonths = [1, 3, 5, 7, 8, 10, 12]
  const shortMonths = [4, 6, 9, 11]

  if (longMonths.includes(month)) return 31
  if (shortMonths.includes(month)) return 30
  return isLeapYear(year) ? 29 : 28
}
export const useCalendar = (options: UseCalendarOptions = {}) => {
  const {
    initialDate = new Date(),
    locale = Intl.DateTimeFormat().resolvedOptions().locale,
    firstDayOfWeek = 0,
  } = options
  const currentYear = ref(initialDate.getFullYear())
  const currentMonth = ref(initialDate.getMonth() + 1)

  // 允许选择一个日期或者一个日期范围。
  const selectDate = (_value: Date | [Date, Date]) => {}

  // 将日历前进到下一个月。
  const goToNextMonth = () => {
    if (currentMonth.value === 12) {
      console.warn('It is already the biggest month')
      return
    }
    currentMonth.value += 1
  }

  // 将日历后退到上一个月。
  const goToPreviousMonth = () => {
    if (currentMonth.value === 1) {
      console.warn('It is already the smallest month')
      return
    }
    currentMonth.value -= 1
  }

  // 将日历前进到下一个月。
  const goToNextYear = () => {
    if (currentYear.value === 285616) {
      console.warn('It is already the biggest year.')
      return
    }
    currentYear.value += 1
  }

  // 将日历后退到上一个月。
  const goToPreviousYear = () => {
    if (currentMonth.value === 1997) {
      console.warn('It is already the smallest year.')
      return
    }
    currentYear.value -= 1
  }

  // 将日历重置到今天的日期。
  const goToToday = () => {
    // 需要重置年月
    const now = new Date()
    currentYear.value = now.getFullYear()
    currentMonth.value = now.getMonth() + 1
  }

  // 用户选中的日期，可以通过用户交互来设置。
  const selectedDate = ref<Date | [Date, Date]>()

  const weekDays = computed(() => {
    let daysOfWeek: string | any[]
    switch (locale) {
      case 'zh-CN':
        daysOfWeek = ['日', '一', '二', '三', '四', '五', '六']
        break
      case 'en-US':
        daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
        break
      default:
        daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
        break
    }

    return daysOfWeek
      .slice(firstDayOfWeek)
      .concat(daysOfWeek.slice(0, firstDayOfWeek))
  })

  const getMonthDays = (year, month): Day[] =>
    Array.from({ length: getDays(year, month) }, (_, index) => {
      const date = new Date()
      date.setFullYear(year)
      date.setMonth(month - 1)
      date.setDate(index + 1)
      const day: Day = {
        name: index + 1,
        value: date,
        week: date.getDay(),
        disabled: false,
        type: 'current',
        selected: false,
      }
      return day
    })

  const fillPadDates = (days: Day[]): Day[] => {
    const startDay = days[0]
    const endDay = days[days.length - 1]
    const startDate = new Date(startDay.value)
    const endDate = new Date(endDay.value)
    return Array.from({ length: startDay.week }, () => {
      startDate.setDate(startDate.getDate() - 1)
      const day: Day = {
        name: startDate.getDate(),
        value: startDate,
        week: startDate.getDate(),
        disabled: true,
        type: 'fill',
        selected: false,
      }
      return day
    })
      .concat(days)
      .concat(
        Array.from({ length: 6 - endDay.week }, () => {
          endDate.setDate(endDate.getDate() + 1)
          const day: Day = {
            name: endDate.getDate(),
            value: endDate,
            week: endDate.getDay(),
            disabled: true,
            type: 'fill',
            selected: false,
          }
          return day
        })
      )
  }

  const getDaysByYear = (
    year: number = new Date().getFullYear(),
    month: number = -1
  ): Day[][] => {
    if (year && month === -1) {
      const months = Array.from({ length: 12 }, (_, k) => k + 1).map((m) =>
        fillPadDates(getMonthDays(year, m))
      )

      return months
    }
    return [fillPadDates(getMonthDays(year, month))]
  }

  const currentYearDays = computed(() => getDaysByYear(currentYear.value))
  const currentMonthDays = computed(() =>
    getDaysByYear(currentYear.value, currentMonth.value)
  )

  return {
    currentYearDays,
    currentMonth,
    currentYear,
    selectedDate,
    currentMonthDays,
    weekDays,
    selectDate,
    goToNextMonth,
    goToPreviousMonth,
    goToNextYear,
    goToPreviousYear,
    goToToday,
    getDays: getDaysByYear,
  }
}

export type UseCalendarReturn = ReturnType<typeof useCalendar>
