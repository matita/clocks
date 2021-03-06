<script>
  import './Clock.css';
  import clocks from '../stores/clocks';

  export let clock;
  export let dateMs;

  const date = new Date()
  let time;
  let timezone;
  const pad = (text) => ('0' + text).substr(-2);
  const formatTime = (d) => pad(d.getHours()) + ':' + pad(d.getMinutes());

  $: {
    timezone = ('minutesOffset' in clock ? clock.minutesOffset : -date.getTimezoneOffset()) / 60;
    date.setTime(dateMs + ((clock.minutesOffset || 0) + (clock.isLocal ? 0 : date.getTimezoneOffset())) * 60 * 1000);
    time = formatTime(date);
  }

  function onNameClick() {
    const newName = prompt('Name of the clock:', clock.name || '');
    if (newName === null) {
      return;
    }
    clocks.rename(clock, newName);
  }
</script>

<div class="clock" class:clock-local="{clock.isLocal}">
  <div class="clock-time">{time}</div>
  <div class="clock-name" on:click={onNameClick}>{clock.name || '---'}</div>
  <div class="clock-city">
    GMT{timezone >= 0 ? `+${timezone}` : timezone}
    &middot;
    {clock.location}
  </div>

  <div class="clock-actions">
    <div class="clock-action clock-action-rename">Rename</div>
    <div class="clock-action clock-action-delete">Delete</div>
    <div class="clock-action clock-action-changeTime">Test specific time</div>
    <div class="clock-action-close"><label for="no-clock">&times;</label></div>
  </div>
</div>
