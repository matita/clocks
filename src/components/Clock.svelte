<script>
  export let clock;
  export let dateMs;

  const date = new Date()
  let time;
  const pad = (text) => ('0' + text).substr(-2);
  const formatTime = (d) => pad(d.getHours()) + ':' + pad(d.getMinutes());
  const HOUR = 1000 * 60 * 60;

  $: {
    date.setTime(dateMs + (clock.timezone || 0) * HOUR);
    time = formatTime(date);
  }
</script>

<div class="clock" class:clock-local="{clock.isLocal}">
  <label for={clock.id}>
    <div class="clock-time">{time}</div>
    <div class="clock-name">{clock.name || '---'}</div>
    <div class="clock-city">{clock.city}</div>
  </label>

  <input type="radio" id={clock.id} name="clock-actions">
  <div class="clock-actions">
    <div class="clock-action clock-action-rename">Rename</div>
    <div class="clock-action clock-action-delete">Delete</div>
    <div class="clock-action clock-action-changeTime">Test specific time</div>
    <div class="clock-action-close"><label for="no-clock">&times;</label></div>
  </div>
</div>
