<script>
  // import './Clock.css';
  import { timeMs } from '../stores/time';
  import SubClock from './SubClock.svelte';

  export let zone;

  const date = new Date()
  const timezone = ('minutesOffset' in zone ? zone.minutesOffset : -date.getTimezoneOffset()) / 60;
  const pad = (text) => ('0' + text).substr(-2);
  const formatTime = (d) => pad(d.getHours()) + ':' + pad(d.getMinutes());
  let time;

  $: {
    date.setTime($timeMs + ((zone.minutesOffset || 0) + (zone.isLocal ? 0 : date.getTimezoneOffset())) * 60 * 1000);
    time = formatTime(date);
  }

  $: sortedClocks = zone.clocks.sort((c1, c2) => (c1.name || '').localeCompare(c2.name || ''))
</script>

<div class="flex" class:clock-local="{zone.isLocal}">
  <div class="text-center py-2 mr-4">
    <span class="">{time}</span>
    <div class="text-xs text-gray-400">GMT{timezone >= 0 ? `+${timezone}` : timezone}</div>
  </div>
  <div class="flex-grow">
    {#each sortedClocks as clock (clock.id)}
      <SubClock {clock} />
    {/each}
  </div>
</div>
