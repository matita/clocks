import { writable, get } from 'svelte/store';
import clocksStore from './clocks';

const store = writable([])
const { subscribe, update } = store
let id = 1;

const has = (clocks, { location, minutesOffset, name }) => clocks.some((clock) => (
  clock.location === location
    && clock.minutesOffset === minutesOffset
    && clock.name === name
))

export default {
  subscribe,
  has: (clock) => has(get(store), clock),
  add: (clock) => update((clocks) => {
    if (has(clocks, clock)) {
      return clocks;
    }

    return clocks.concat({
      ...clock,
      id: id++,
    });
  }),
  delete: (clock) => update((clocks) => clocks.filter((c) => c !== clock)),
  saveAll: (clock) => update((clocks) => {
    clocks.forEach(clocksStore.add);
    return [];
  }),
}
