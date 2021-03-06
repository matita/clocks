<script>
  import './Clock.css';
  import clocks from '../stores/clocks';
  import { timeMs } from '../stores/time';
  import SubClock from './SubClock.svelte';

  export let zone;

  const date = new Date()
  let time;
  let timezone;
  const pad = (text) => ('0' + text).substr(-2);
  const formatTime = (d) => pad(d.getHours()) + ':' + pad(d.getMinutes());

  $: {
    timezone = ('minutesOffset' in zone ? zone.minutesOffset : -date.getTimezoneOffset()) / 60;
    date.setTime($timeMs + ((zone.minutesOffset || 0) + (zone.isLocal ? 0 : date.getTimezoneOffset())) * 60 * 1000);
    time = formatTime(date);
  }

  $: sortedClocks = zone.clocks.sort((c1, c2) => (c1.name || '').localeCompare(c2.name || ''))
</script>

<div class="clock" class:clock-local="{zone.isLocal}">
  <div class="clock-time">
    <span class="clock-time-display">{time}</span>
    <div class="clock-gmt">GMT{timezone >= 0 ? `+${timezone}` : timezone}</div>
  </div>
  <div class="clock-meta">
    {#each sortedClocks as clock}
      <SubClock {clock} />
    {/each}
  </div>
</div>
