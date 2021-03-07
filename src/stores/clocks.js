import { writable } from 'svelte/store';

const { subscribe, update } = writable([])
let id = 1;

export default {
  subscribe,
  add: ({ location, minutesOffset, name }) => update((clocks) => {
    if (clocks.some((clock) => (
      clock.location === location
        && clock.minutesOffset === minutesOffset
        && clock.name === name
    ))) {
      return clocks;
    }

    return clocks.concat({
      location,
      minutesOffset,
      name,
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
