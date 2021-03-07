<script>
  import { slide } from 'svelte/transition';
  import { timeMs } from '../stores/time';
  import SubClock from './SubClock.svelte';

  export let zone;
  let time;

  const date = new Date()
  const timezone = ('minutesOffset' in zone ? zone.minutesOffset : -date.getTimezoneOffset()) / 60;
  const formatTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


  $: {
    date.setTime($timeMs + ((zone.minutesOffset || 0) + (zone.isLocal ? 0 : date.getTimezoneOffset())) * 60 * 1000);
    time = formatTime(date);
  }

  $: sortedClocks = zone.clocks.sort((c1, c2) => (c1.name || '').localeCompare(c2.name || ''))
</script>

<div class="flex" class:clock-local="{zone.isLocal}" transition:slide>
  <div class="relative w-24">
    <div class="text-center py-2 px-2 sticky top-0">
      <span>{time}</span>
      <div class="text-xs text-gray-400">GMT{timezone >= 0 ? `+${timezone}` : timezone}</div>
    </div>
  </div>
  <div class="flex-grow">
    {#each sortedClocks as clock (clock.id)}
      <SubClock {clock} />
    {/each}
  </div>
</div>
