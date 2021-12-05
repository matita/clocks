<script>
  import { slide } from 'svelte/transition'
  import ClockEdit from './ClockEdit.svelte'
  import clocks from '../stores/clocks';
  import { activeClock } from '../stores/activeClock'

  export let clock

  function onClick() {
    $activeClock = clock
  }
</script>

<div
  class="px-6 py-2 mb-2 relative rounded-full"
  class:bg-white={!clock.isLocal}
  transition:slide|local
  on:click={onClick}
>
  {#if clock.name || clock.isLocal}
    <div class="text-xs text-gray-400">{clock.isLocal ? 'Your position' : clock.location}</div>
  {/if}
  <div class="text-gray-500">{clock.isLocal ? 'Local' : clock.name || clock.location}</div>
</div>
