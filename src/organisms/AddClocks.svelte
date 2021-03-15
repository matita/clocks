<script>
  import { createEventDispatcher } from 'svelte';
  import Clocks from '../components/Clocks.svelte';
  import Modal from '../atoms/Modal.svelte';
  import ModalBody from '../atoms/ModalBody.svelte';
  import ModalButtons from '../atoms/ModalButtons.svelte';
  import Button from '../atoms/Button.svelte';
  import clocks from '../stores/clocksToAdd';
  import SearchForm from '../components/SearchForm.svelte';

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');

  function onSaveAll() {
    clocks.saveAll();
    close();
  }

  function onClose() {
    close();
  }

  function onLocationSelected({ detail }) {
    clocks.add(detail);
  }
</script>

<Modal>
  <ModalBody>
    <SearchForm withGmaps on:locationselected={onLocationSelected} />
    <Clocks clocks={$clocks} />
  </ModalBody>

  <ModalButtons>
    <Button primary on:click={onSaveAll}>Save all</Button>
    <Button on:click={onClose}>Close</Button>
  </ModalButtons>
</Modal>
