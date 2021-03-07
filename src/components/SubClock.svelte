<script context="module">
  import { writable } from 'svelte/store';
  let activeClock = writable(null);
</script>
<script>
  import clocks from '../stores/clocks';

  export let clock;
  $: active = $activeClock === clock;

  console.log('this subclock', this);

  function onRenameClick() {
    const newName = prompt('Name of the clock:', clock.name || '');
    if (newName === null) {
      return;
    }
    $activeClock = null;
    clocks.rename(clock, newName);
  }

  function onClick() {
    $activeClock = clock;
  }

  function onDeleteClick() {
    if (!confirm('Are you sure you want to delete this clock?')) {
      return;
    }
    $activeClock = null;
    clocks.delete(clock);
  }
</script>



<div
  class="bg-white px-4 py-2 mb-2 relative rounded-xl transition-all transform"
  class:z-10={active}
  class:-translate-y-1={active}
  class:shadow-none={!active}
  class:shadow-xl={active}
  on:click={onClick}
>
  <div class="text-green-500">{clock.name || '---'}</div>
  <div class="text-xs text-gray-400">{clock.location}</div>
  {#if active}
    <button class="absolute top-1 right-1 px-2 focus:outline-none focus:ring-1" on:click|stopPropagation={() => active = false}>&times;</button>
    <div class="clock-actions">
      <button on:click|stopPropagation={onRenameClick}>Rename</button>
      <button on:click|stopPropagation={onDeleteClick}>Delete</button>
    </div>
  {/if}
</div>
