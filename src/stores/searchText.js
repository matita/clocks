import { writable } from 'svelte/store'
import { parseTime } from './time'

const { subscribe, update } = writable('')
const search = (text) => {
  if (!parseTime(text)) {
    update(() => text.trim().toLowerCase())
  }
}

export default {
  subscribe,
  search,
  reset: () => search(''),
}
