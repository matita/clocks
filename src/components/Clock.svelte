<script>
  import { onMount } from 'svelte';

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
</script>

<style>
  .clock {
    width: 100%;
    padding: .5em;
    font-size: 2em;
  }

  .clock + .clock {
    border-top: 1px solid #eee;
  }

  .clock-local {
    background: rgba(0,0,0,.04);
  }

  .clock-time {
    float: left;
    margin-right: .5em;
    width: 3em;
    text-align: center;
    cursor: pointer;
  }

  .clock-time:hover {
    outline: 1px dashed #999;
  }

  .clock-name {
    color: #6a9fb5;
    font-size: .5em;
  }

  .clock-city {
    font-size: .4em;
    color: #999;
  }

  .clock-actions {
    position: relative;
    display: none;
    background: #eee;
    box-shadow: 0 2px 2px rgba(0,0,0,.4) inset;
    border-radius: 1em;
    font-size: .8em;
    margin: 1em;
    padding: 1em;
  }
</style>

<div class="clock" class:clock-local="{clock.isLocal}">
  <div class="clock-time">{time}</div>
  <div class="clock-name">{clock.name || '---'}</div>
  <div class="clock-city">
    GMT{timezone >= 0 ? `+${timezone}` : timezone}
    &middot;
    {clock.location}
  </div>

  <input type="radio" id={clock.id} name="clock-actions">
  <div class="clock-actions">
    <div class="clock-action clock-action-rename">Rename</div>
    <div class="clock-action clock-action-delete">Delete</div>
    <div class="clock-action clock-action-changeTime">Test specific time</div>
    <div class="clock-action-close"><label for="no-clock">&times;</label></div>
  </div>
</div>
