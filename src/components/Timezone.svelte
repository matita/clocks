<script>
  import { slide } from 'svelte/transition';
  import { timeMs } from '../stores/time';
  import Clock from './Clock.svelte';
  import Time from './Time.svelte';

  export let zone;
  export let showMenu = false;

  let time;

  const date = new Date()
  const timezone = ('minutesOffset' in zone ? zone.minutesOffset : -date.getTimezoneOffset()) / 60;
  const formatTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const isCurrentTimezone = zone.minutesOffset === -date.getTimezoneOffset();

  $: {
    date.setTime($timeMs + ((zone.minutesOffset || 0) + (zone.isLocal ? 0 : date.getTimezoneOffset())) * 60 * 1000);
    time = formatTime(date);
  }

  $: sortedClocks = zone.clocks.sort((c1, c2) => {
    if (c1.isLocal) {
      return -1;
    }

    if (c2.isLocal) {
      return 1;
    }

    return (c1.name || '').localeCompare(c2.name || '')
  })
</script>

<div class="flex max-w-full" transition:slide|local>
  <div class="flex-none relative w-24 text-center py-2 px-2">
    <Time class="sticky top-0" {time} {isCurrentTimezone} {timezone} />
  </div>
  <div class="flex-1">
    {#each sortedClocks as clock (clock.id)}
      <Clock {clock} {showMenu} />
    {/each}
  </div>
</div>
