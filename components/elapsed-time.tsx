'use client'

import {useEffect, useState} from "react";
import {getTimeDifference, getTotalDays} from "@/lib/date-service";


export default function ElapsedTime() {
  const [elapsed, setElapsed] = useState<string[]>([])
  const [showYear, setShowYear] = useState(true)
  useEffect(() => {
    function formatDiff() {
      const [years, months, days, hours, minutes, seconds] = getTimeDifference()
      const parts: string[] = []
      if (showYear) {
        parts.push(`${years} ${years > 1 ? 'years' : 'year'}`)
        parts.push(`${months} ${months > 1 ? 'months' : 'month'}`)
      } else {
        const totalMonths = years * 12 + months
        parts.push(`${totalMonths} ${totalMonths > 1 ? 'months' : 'month'}`)
      }
      parts.push(`${days} ${days > 1 ? 'days' : 'day'}`)
      parts.push(`${hours.toString().padStart(2, '0')}h`, `${minutes.toString().padStart(2, '0')}m`, `${seconds.toString().padStart(2, '0')}s`)
      return [parts.slice(0, 3).join(' '), parts.slice(3).join(' ')]
    }

    function tick() {
      setElapsed(formatDiff())
    }

    function updateMeta() {
      const timeDiff = getTotalDays()
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
  }, [showYear])

  return (
    <div className={`text-center flex flex-col justify-center hover:cursor-pointer`} onClick={() => setShowYear(!showYear)}>
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