<script>
  import { slide } from 'svelte/transition';
  import Clock from './Clock.svelte';
  import Time from './Time.svelte';

  export let zone;

  $: sortedClocks = zone.clocks.sort((c1, c2) => {
    if (c1.isLocal) {
      return -1;
    }

    if (c2.isLocal) {
      return 1;
    }

    return (c1.name || '').localeCompare(c2.name || '')
  })
</script>

<div class="flex max-w-full" transition:slide|local>
  <div class="flex-none relative w-24 text-center py-2 px-2">
    <Time class="sticky top-24" minutesOffset={zone.minutesOffset} />
  </div>
  <div class="flex-1">
    {#each sortedClocks as clock (clock.id)}
      <Clock {clock} />
    {/each}
  </div>
</div>
