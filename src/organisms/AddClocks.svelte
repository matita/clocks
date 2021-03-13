<script>
  import { createEventDispatcher } from 'svelte';
  import Clocks from '../components/Clocks.svelte';
  import Modal from '../atoms/Modal.svelte';
  import ModalBody from '../atoms/ModalBody.svelte';
  import ModalButtons from '../atoms/ModalButtons.svelte';
  import Button from '../atoms/Button.svelte';
  import clocksStore from '../stores/clocks';

  export let clocks = [];

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');

  function onSaveAll() {
    clocks.forEach(clocksStore.add);
    close();
  }

  function onClose() {
    close();
  }
</script>

<Modal>
  <ModalBody>
    <Clocks {clocks} />
  </ModalBody>

  <ModalButtons>
    <Button primary on:click={onSaveAll}>Save all</Button>
    <Button on:click={onClose}>Close</Button>
  </ModalButtons>
</Modal>
