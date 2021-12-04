import { readable } from 'svelte/store';

const timeRegEx = /^\s*(\d{1,2})(?::?(\d{1,2}))?\s*([ap]m\b)?\s*(?:gmt|utc)?(?:(\+|-)\s*(\d{1,2}(\.\d+)?))?/i;
let fixedMs = null;

export const parseTime = (text) => {
  const timeMatch = text.match(timeRegEx);
  if (!timeMatch) {
    fixedMs = null
    return false
  }

  let h = parseInt(timeMatch[1], 10)
  let m = parseInt(timeMatch[2], 10) || 0
  const ampm = (timeMatch[3] || '').toLowerCase()
  const sign = timeMatch[4]
  const timeOffset = parseFloat(timeMatch[5])

  if (ampm === 'pm' && h < 12) {
    h += 12
  } else if (ampm === 'am' && h === 12) {
    h = 0
  }

  const date = new Date()

  if (sign) {
    const multiplier = sign === '-' ? -1 : 1
    const minutesOffset = (timeOffset * multiplier * 60)
    m -=  minutesOffset + date.getTimezoneOffset()
  }

  date.setHours(h)
  date.setMinutes(m)
  fixedMs = date.getTime()
  return true
}

export const timeMs = readable(Date.now(), (set) => {
  const interval = setInterval(() => {
    set(fixedMs || Date.now())
  }, 100);

  return () => {
    clearInterval(interval);
  };
})
