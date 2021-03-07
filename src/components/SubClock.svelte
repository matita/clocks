<script>
  import clocks from '../stores/clocks';

  export let clock;
  let active = false;

  function onRenameClick() {
    const newName = prompt('Name of the clock:', clock.name || '');
    if (newName === null) {
      return;
    }
    active = false;
    clocks.rename(clock, newName);
  }

  function onClick() {
    active = true;
  }

  function onDeleteClick() {
    if (!confirm('Are you sure you want to delete this clock?')) {
      return;
    }
    active = false;
    clocks.delete(clock);
  }
</script>

<div class="bg-white px-4 py-2 rounded-xl mb-2" class:active={active} on:click={onClick}>
  <div class="text-green-500">{clock.name || '---'}</div>
  <div class="text-xs text-gray-400">{clock.location}</div>
  {#if active}
    <div class="clock-close" on:click|stopPropagation={() => active = false}>&times;</div>
    <div class="clock-actions">
      <button on:click|stopPropagation={onRenameClick}>Rename</button>
      <button on:click|stopPropagation={onDeleteClick}>Delete</button>
    </div>
  {/if}
</div>
