<script>
  export let time;
  export let timezone;
  export let isCurrentTimezone;
  let className;
  export { className as class };
</script>

<div class={className}>
  <span class:text-primary-600={isCurrentTimezone}>{time}</span>
  <div
    class="text-xs text-gray-400"
    class:text-primary-500={isCurrentTimezone}
  >
    GMT{timezone >= 0 ? `+${timezone}` : timezone}
  </div>
</div>
