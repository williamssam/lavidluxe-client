import { useEffect, useMemo, useState } from 'react'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

type TimerProps = {
  deadline: string
}

export const Timer = ({ deadline }: TimerProps) => {
  const deadlineTime = new Date(deadline).toString()
  const parsedDeadline = useMemo(() => Date.parse(deadlineTime), [deadlineTime])
  const [time, setTime] = useState(parsedDeadline - Date.now())

  useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    )

    return () => clearInterval(interval)
  }, [parsedDeadline])

  return (
    <div className='text-xs mt-5'>
      <p className='uppercase font-bold tracking-[3px] text-[0.6rem]'>
        Promo (discount) ends on:
      </p>
      <ul className='flex items-center gap-4 pt-1'>
        {Object.entries({
          Days: time / DAY,
          Hours: (time / HOUR) % 24,
          Minutes: (time / MINUTE) % 60,
          Seconds: (time / SECOND) % 60,
        }).map(([label, value]) => (
          <div
            key={label}
            className='flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-sm outline-1 outline outline-offset-2 outline-gray-300'>
            <p>{`${Math.floor(value)}`.padStart(2, '0')}</p>
            <span className='lowercase'>{label}</span>
          </div>
        ))}
      </ul>
    </div>
  )
}
