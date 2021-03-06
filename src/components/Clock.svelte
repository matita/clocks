<script>
  import './Clock.css';
  import clocks from '../stores/clocks';

  export let zone;
  export let dateMs;

  const date = new Date()
  let time;
  let timezone;
  const pad = (text) => ('0' + text).substr(-2);
  const formatTime = (d) => pad(d.getHours()) + ':' + pad(d.getMinutes());

  $: {
    timezone = ('minutesOffset' in zone ? zone.minutesOffset : -date.getTimezoneOffset()) / 60;
    date.setTime(dateMs + ((zone.minutesOffset || 0) + (zone.isLocal ? 0 : date.getTimezoneOffset())) * 60 * 1000);
    time = formatTime(date);
  }

  $: sortedClocks = zone.clocks.sort((c1, c2) => (c1.name || '').localeCompare(c2.name || ''))

  function onNameClick(clock) {
    const newName = prompt('Name of the clock:', clock.name || '');
    if (newName === null) {
      return;
    }
    clocks.rename(clock, newName);
  }
</script>

<div class="clock" class:clock-local="{zone.isLocal}">
  <div class="clock-time">
    <span class="clock-time-display">{time}</span>
    <div class="clock-gmt">GMT{timezone >= 0 ? `+${timezone}` : timezone}</div>
  </div>
  <div class="clock-meta">
    {#each sortedClocks as clock}
      <div class="sub-clock">
        <div class="clock-name" on:click={() => onNameClick(clock)}>{clock.name || '---'}</div>
        <div class="clock-city">{clock.location}</div>
      </div>
    {/each}
  </div>

  <div class="clock-actions">
    <div class="clock-action clock-action-rename">Rename</div>
    <div class="clock-action clock-action-delete">Delete</div>
    <div class="clock-action clock-action-changeTime">Test specific time</div>
    <div class="clock-action-close"><label for="no-clock">&times;</label></div>
  </div>
</div>
