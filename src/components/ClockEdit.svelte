<script>
  import { createEventDispatcher, onMount } from 'svelte'

  export let clock

  let location = (clock && clock.location) || ''
  let name = (clock && clock.name) || ''

  let locationInput
  let nameInput

  const dispatch = createEventDispatcher()

  onMount(() => {
    if (clock && clock.location) {
      nameInput.focus()
    } else {
      locationInput.focus()
    }
  })

  function onCancelClick() {
    dispatch('cancel')
  }

  function onSaveClick() {
    dispatch('save', { location, name })
  }

  function onDeleteClick() {
    dispatch('delete')
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 27: // ESC
        return onCancelClick()

      case 13: // Enter
        return onSaveClick()
    }
  }
</script>

<div class="text-gray-400" on:keydown={onKeyDown}>
  <div class="flex place-items-center my-4">
    <label for="clock-location" class="flex-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </label>
    <input
      id="clock-location"
      class="mx-2 p-2 flex-grow border border-gray-400 text-gray-500 focus:outline-none ring-primary-500 rounded-lg"
      class:focus:ring-1={!clock}
      class:border={!clock}
      type="search"
      placeholder="some area"
      readonly={!!clock}
      bind:this={locationInput}
      bind:value={location}>
  </div>

  <div class="flex place-items-center my-4">
    <label for="clock-name" class="flex-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </label>
    <input
      id="clock-name"
      class="mx-2 p-2 flex-grow border border-gray-400 text-gray-500 focus:outline-none focus:ring-1 ring-primary-500 rounded-lg"
      bind:this={nameInput}
      bind:value={name}>
  </div>

  <div class="flex my-4">
    <svg xmlns="http://www.w3.org/2000/svg" on:click|stopPropagation={onDeleteClick} class="h-6 w-6 cursor-pointer text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>

    <div class="flex-grow"></div>

    <svg xmlns="http://www.w3.org/2000/svg" on:click|stopPropagation={onCancelClick} class="h-6 w-6 ml-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" on:click|stopPropagation={onSaveClick} class="h-6 w-6 ml-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
</div>
