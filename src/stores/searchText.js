import { writable } from 'svelte/store'
import { parseTime } from './time'

const { subscribe, update } = writable({ rawText: '', searchText: '' })
const search = (rawText) => {
  const searchText = parseTime(rawText) ? '' : rawText.trim().toLowerCase()
  update(() => ({ rawText, searchText }))
}

export default {
  subscribe,
  search,
  reset: () => search(''),
}
