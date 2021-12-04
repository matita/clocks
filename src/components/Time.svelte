<script>
  export let date;
  export let timezone;
  export let isCurrentTimezone;
  let className;
  export { className as class };

  const formatTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
</script>

<div class={className}>
  <span class:text-primary-600={isCurrentTimezone}>{formatTime(date)}</span>
  <div
    class="text-xs text-gray-400"
    class:text-primary-500={isCurrentTimezone}
  >
    GMT{timezone >= 0 ? `+${timezone}` : timezone}
  </div>
</div>
