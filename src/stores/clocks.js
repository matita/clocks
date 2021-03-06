import { writable } from 'svelte/store';

const { subscribe, update } = writable([])

export default {
  subscribe,
  add: (clock) => update((clocks) => clocks.concat(clock)),
  rename: (clock, newName) => update((clocks) => clocks.map((c) => {
    if (c !== clock) {
      return c;
    }

    return { ...clock, name: newName };
  })),
  delete: (clock) => update((clocks) => clocks.filter((c) => c !== clock)),
}
