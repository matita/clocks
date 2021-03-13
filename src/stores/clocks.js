import { writable, get } from 'svelte/store';

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
  rename: (clock, newName) => update((clocks) => clocks.map((c) => {
    if (c !== clock) {
      return c;
    }

    return { ...clock, name: newName };
  })),
  delete: (clock) => update((clocks) => clocks.filter((c) => c !== clock)),
}
