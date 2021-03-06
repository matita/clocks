import { readable } from 'svelte/store';

export const timeMs = readable(Date.now(), (set) => {
  const interval = setInterval(() => {
    set(Date.now())
  }, 100);

  return () => {
    clearInterval(interval);
  };
})
