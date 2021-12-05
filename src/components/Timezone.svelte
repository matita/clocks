<script>
  import { slide } from 'svelte/transition';
  import { timeMs } from '../stores/time';
  import Clock from './Clock.svelte';
  import Time from './Time.svelte';

  export let zone;
  export let showMenu = false;

  const date = new Date()
  const timezone = ('minutesOffset' in zone ? zone.minutesOffset : -date.getTimezoneOffset()) / 60;
  const isCurrentTimezone = zone.minutesOffset === -date.getTimezoneOffset();

  $: {
    date.setTime($timeMs + ((zone.minutesOffset || 0) + (zone.isLocal ? 0 : date.getTimezoneOffset())) * 60 * 1000);
    date = date;
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
    <Time class="sticky top-24" {date} {isCurrentTimezone} {timezone} />
  </div>
  <div class="flex-1">
    {#each sortedClocks as clock (clock.id)}
      <Clock {clock} {showMenu} />
    {/each}
  </div>
</div>
