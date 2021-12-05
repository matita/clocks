<script>
  import searchText from '../stores/searchText'
  import { timeMs } from '../stores/time';

  let className;
  export { className as class };
  export let minutesOffset

  const formatTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const timezone = minutesOffset / 60
  const timezoneLabel = `GMT${timezone >= 0 ? `+${timezone}` : timezone}`
  
  const date = new Date()
  const isCurrentTimezone = minutesOffset === -date.getTimezoneOffset()

  $: {
    date.setTime($timeMs + ((minutesOffset || 0) + (date.getTimezoneOffset())) * 60 * 1000);
    date = date;
  }

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
  <span 
    class="text-gray-500" 
    class:text-primary-600={isCurrentTimezone}
  >
    {formatTime(date)}
  </span>
</div>
