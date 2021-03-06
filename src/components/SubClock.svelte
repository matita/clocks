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

<style>
  .sub-clock {
    position: relative;
    margin: .2em 0;
    transition: all .2s;
  }

  .active {
    padding: .4em;
    box-shadow: 0 2px 2px rgba(0,0,0,.2);
  }

  .clock-close {
    position: absolute;
    top: .2em;
    right: .5em;
    color: #999;
  }
</style>

<div class="sub-clock" class:active={active} on:click={onClick}>
  <div class="clock-name">{clock.name || '---'}</div>
  <div class="clock-city">{clock.location}</div>
  {#if active}
    <div class="clock-close" on:click|stopPropagation={() => active = false}>&times;</div>
    <div class="clock-actions">
      <button on:click|stopPropagation={onRenameClick}>Rename</button>
      <button on:click|stopPropagation={onDeleteClick}>Delete</button>
    </div>
  {/if}
</div>
