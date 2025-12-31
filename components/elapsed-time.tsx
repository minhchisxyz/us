'use client'

import {useEffect, useState} from "react";
import {START_DATE} from "@/lib/constants";


export default function ElapsedTime() {
  const startDay = START_DATE
  const [elapsed, setElapsed] = useState<string[]>([])
  useEffect(() => {
    const MS = {
      second: 1000,
      minute: 1000 * 60,
      hour: 1000 * 60 * 60,
      day: 1000 * 60 * 60 * 24,
      month: 1000 * 60 * 60 * 24 * 30, // approx month
      year: 1000 * 60 * 60 * 24 * 365, // approx year
    }

    function formatDiff(ms: number) {
      let r = ms
      const years = Math.floor(r / MS.year); r %= MS.year
      const months = Math.floor(r / MS.month); r %= MS.month
      const days = Math.floor(r / MS.day); r %= MS.day
      const hours = String(Math.floor(r / MS.hour)).padStart(2, '0'); r %= MS.hour
      const minutes = String(Math.floor(r / MS.minute)).padStart(2, '0'); r %= MS.minute
      const seconds = String(Math.floor(r / MS.second)).padStart(2, '0')

      const parts: string[] = []
      parts.push(`${years} ${years > 1 ? 'years' : 'year'}`)
      parts.push(`${months} ${months > 1 ? 'months' : 'month'}`)
      parts.push(`${days} ${days > 1 ? 'days' : 'day'}`)
      parts.push(`${hours}h`, `${minutes}m`, `${seconds}s`)
      return [parts.slice(0, 3).join(' '), parts.slice(3).join(' ')]
    }

    function tick() {
      const diff = Math.max(0, Date.now() - startDay.getTime())
      setElapsed(formatDiff(diff))
    }

    function updateMeta() {
      const now = new Date()
      const timeDiff = Math.floor((now.getTime() - startDay.getTime()) / 1000 / 60 / 60 / 24)
      // update title
      document.title = `Been ${timeDiff} ${timeDiff > 1 ? 'days' : 'day'} together`
    }

    tick()
    updateMeta()
    const id1 = setInterval(updateMeta, 1000 * 60)
    const id2 = setInterval(tick, 100)
    return () => {
      clearInterval(id1)
      clearInterval(id2)
    }
  }, [startDay])

  return (
    <div className={`text-center flex flex-col justify-center`}>
      <span className={`hidden md:block text-3xl`}>
      { elapsed[0] }, { elapsed[1] }
      </span>
      <span className={`md:hidden text-xl`}>
        { elapsed[0] }
      </span>
      <span className={`md:hidden text-xl`}>
        { elapsed[1] }
      </span>
    </div>
  )
}