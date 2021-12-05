<script>
  import ClockEdit from './ClockEdit.svelte'
  import Modal from '../atoms/Modal.svelte'
  import ModalBody from '../atoms/ModalBody.svelte'

  import clocks from '../stores/clocks'
  import { activeClock } from '../stores/activeClock'

  function onCancel() {
    $activeClock = null
  }

  function onSave(e) {
    const { name, ...props } = e.detail
    if ($activeClock.id === 'new') {
      clocks.add({
        name,
        ...props,
      })
    } else {
      clocks.rename($activeClock, name)
    }
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
  <Modal>
    <ModalBody>
      <ClockEdit 
        clock={$activeClock} 
        on:cancel={onCancel}
        on:save={onSave}
        on:delete={onDelete}
      />
    </ModalBody>
  </Modal>
{/if}
