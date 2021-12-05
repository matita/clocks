<script>
  import Overlay from '../atoms/Overlay.svelte'
  import ClockEdit from './ClockEdit.svelte'

  import clocks from '../stores/clocks'
  import { activeClock } from '../stores/activeClock'

  function onCancel() {
    $activeClock = null
  }

  function onSave(e) {
    const { name } = e.detail
    clocks.rename($activeClock, name)
    $activeClock = null
  }

  function onDelete() {
    if (confirm('Are you sure you want to delete this clock?')) {
      clocks.delete($activeClock)
      $activeClock = null
    }
  }
</script>

{#if $activeClock}
  <Overlay>
    <div class="bg-white w-2/3 max-w-xl p-4 mx-auto rounded-md">
      <ClockEdit 
        clock={$activeClock} 
        on:cancel={onCancel}
        on:save={onSave}
        on:delete={onDelete}
      />
    </div>
  </Overlay>
{/if}
