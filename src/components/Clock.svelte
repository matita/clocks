<script context="module">
  import { writable } from 'svelte/store'
  let activeClock = writable(null)
</script>
<script>
  import { slide } from 'svelte/transition'
  import ClockEdit from './ClockEdit.svelte'
  import clocks from '../stores/clocks';

  export let clock

  $: active = $activeClock === clock
  $: isEditing = !!active

  function onClick() {
    $activeClock = clock
  }

  function onCancel() {
    $activeClock = null
  }

  function onSave(e) {
    const { name } = e.detail
    clocks.rename(clock, name)
    isEditing = false
  }

  function onDelete() {
    if (confirm('Are you sure you want to delete this clock?')) {
      clocks.delete(clock)
    }
  }
</script>

<div
  class="px-6 py-2 mb-2 relative rounded-full"
  class:rounded-full={!isEditing}
  class:rounded-lg={isEditing}
  class:bg-white={!clock.isLocal}
  transition:slide|local
  on:click={onClick}
>
  {#if isEditing}
    <ClockEdit {clock} on:cancel={onCancel} on:save={onSave} on:delete={onDelete} />
  {:else}
    {#if clock.name || clock.isLocal}
      <div class="text-xs text-gray-400">{clock.isLocal ? 'Your position' : clock.location}</div>
    {/if}
    <div class="text-gray-500">{clock.isLocal ? 'Local' : clock.name || clock.location}</div>
  {/if}
</div>
