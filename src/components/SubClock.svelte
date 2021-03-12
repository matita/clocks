<script context="module">
  import { writable } from 'svelte/store';
  let activeClock = writable(null);
</script>
<script>
  import { slide } from 'svelte/transition';
  import ClockMenu from '../organisms/ClockMenu.svelte';

  export let clock;
  $: active = $activeClock === clock;

  function onClick() {
    $activeClock = clock;
  }
</script>

<div
  class="px-4 py-2 mb-2 relative rounded-xl transition-shadow duration-300"
  class:bg-white={!clock.isLocal}
  transition:slide
>
  <div class="text-gray-500">{clock.isLocal ? 'Local' : clock.name || '---'}</div>
  <div class="text-xs text-gray-400">{clock.isLocal ? 'Your position' : clock.location}</div>
  {#if !clock.isLocal}
    <button class="absolute top-2 right-1 px-2" on:click={onClick}>&vellip;</button>
  {/if}
  {#if active}
    <ClockMenu clock={$activeClock} on:close={() => $activeClock = null} />
  {/if}
</div>
