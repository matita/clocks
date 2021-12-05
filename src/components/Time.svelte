<script>
  import searchText from '../stores/searchText'

  export let date;
  export let timezone;
  export let isCurrentTimezone;
  let className;
  export { className as class };

  const formatTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const timezoneLabel = `GMT${timezone >= 0 ? `+${timezone}` : timezone}`

  const onClick = () => {
    const value = `${formatTime(date)} ${timezoneLabel}`
    searchText.search(value)
  }
</script>

<div class={`cursor-pointer ${className}`} on:click={onClick}>
  <div
    class="text-xs text-gray-400"
    class:text-primary-500={isCurrentTimezone}
  >
    {timezoneLabel}
  </div>
  <span class:text-primary-600={isCurrentTimezone}>{formatTime(date)}</span>
</div>
