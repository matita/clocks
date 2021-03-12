import { writable } from 'svelte/store'

const { subscribe, update } = writable('')
const search = (text) => update(() => text.trim().toLowerCase())

export default {
  subscribe,
  search,
  reset: () => search(''),
}
