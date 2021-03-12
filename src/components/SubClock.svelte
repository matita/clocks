<script context="module">
  import { writable } from 'svelte/store';
  let activeClock = writable(null);
</script>
<script>
  import { copy, serializeClocks } from '../utils';
  import { fade, slide } from 'svelte/transition';
  import Action from './Action.svelte';
  import clocks from '../stores/clocks';

  export let clock;
  let copied = false;
  $: active = $activeClock === clock;

  function onRenameClick() {
    $activeClock = null;
    const newName = prompt('Name of the clock:', clock.name || '');
    if (newName === null) {
      return;
    }
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

  function onShareClick() {
    if (copied) {
      return;
    }

    const url = `${location.protocol}//${location.host}${location.pathname}?clocks=${serializeClocks([clock])}`;
    copy(url);
    copied = true;
    setTimeout(() => {
      copied = false;
      $activeClock = null;
    }, 1000);
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
    <div
      class="z-10 bg-black bg-opacity-30 fixed top-0 left-0 right-0 bottom-0 flex place-items-center"
      transition:fade="{{ duration: 100 }}"
      on:click={() => $activeClock = null}
    >
      <div
        role="menu"
        class="bg-white w-56 mx-auto rounded-md ring-1 ring-black ring-opacity-5 py-1"
      >
        <Action on:click={onRenameClick}>Rename</Action>
        <Action on:click={onShareClick}>{ copied ? 'Link copied!' : 'Share' }</Action>
        <Action on:click={onDeleteClick}>Delete</Action>
      </div>
    </div>
  {/if}
</div>
