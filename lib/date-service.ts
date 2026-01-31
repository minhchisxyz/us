const START_DATE = new Date(2023, 7, 30, 20, 30, 0)

const S_MS = 1000
const M_MS = 60 * S_MS
const H_MS = 60 * M_MS
const DAY_MS = 24 * H_MS

export function getTotalDays() {
  return Math.floor((new Date().getTime() - START_DATE.getTime()) / DAY_MS)
}

function getYears(start: Date, end: Date) {
  let years = 0
  while (start <= end) {
    years++
    const currentYear = start.getFullYear()
    start.setFullYear(currentYear + 1)
    if (start > end) {
      years--
      start.setFullYear(currentYear)
      break
    }
  }
  return years
}

function getMonths(start: Date, end: Date) {
  let months = 0
  while (start <= end) {
    months++
    const temp = new Date(start)
    temp.setMonth(temp.getMonth() + 1)
    if (temp > end) {
      months--
      temp.setMonth(temp.getMonth() - 1)
      break
    }
    start.setMonth(start.getMonth() + 1)
  }
  return months
}

function getDaysAndTime(start: Date, end: Date) {
  let diff = end.getTime() - start.getTime()
  const days = Math.floor(diff / DAY_MS)
  diff -= days * DAY_MS
  const hours = Math.floor(diff / H_MS)
  diff -= hours * H_MS
  const minutes = Math.floor(diff / M_MS)
  diff -= minutes * M_MS
  const seconds = Math.floor(diff / S_MS)
  return [days, hours, minutes, seconds]
}

export function getTimeDifference() {
  const now = new Date()
  const current = new Date(START_DATE)
  const years = getYears(current, now)
  const months = getMonths(current, now)
  const [days, hours, minutes, seconds] = getDaysAndTime(current, now)
  return [years, months, days, hours, minutes, seconds]
}