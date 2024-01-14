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

interface UseCalendarOptions {
  initialDate?: Date // 默认当日
  locale?: 'en-US' | 'zh-CN' // 默认当地
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
    locale = 'en-US',
    firstDayOfWeek = 0,
  } = options

  // 允许选择一个日期或者一个日期范围。
  const selectDate = (_value: Date | [Date, Date]) => {}

  // 将日历前进到下一个月。
  const goToNextMonth = () => {}

  // 将日历后退到上一个月。
  const goToPreviousMonth = () => {}

  // 将日历重置到今天的日期。
  const goToToday = () => {}

  const currentYear = initialDate.getFullYear()
  const currentMonth = initialDate.getMonth() + 1

  // 当前月份中的所有天，包括前一个月和下一个月在当前月视图中显示的天。
  const currentMonthDays = computed(() =>
    Array.from(
      { length: getDays(currentYear, currentMonth) },
      (_, index) => index + 1
    )
  )

  // 用户选中的日期，可以通过用户交互来设置。
  const selectedDate = ref<Date | [Date, Date]>()

  const weekDays = computed(() => {
    let daysOfWeek: string | any[]
    switch (locale) {
      case 'zh-CN':
        daysOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
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

  return {
    selectedDate,
    currentMonthDays,
    weekDays,
    selectDate,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
  }
}

export type UseCalendarReturn = ReturnType<typeof useCalendar>
