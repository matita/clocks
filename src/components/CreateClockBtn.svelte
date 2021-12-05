<script>
  import { activeClock } from '../stores/activeClock'

  import Button from "../atoms/Button.svelte"

  function onClick() {
    $activeClock = { id: 'new' }
  }
</script>

<Button class="my-4 rounded-full" primary on:click={onClick}>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
  </svg>
</Button>
