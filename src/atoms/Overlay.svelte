<script>
  import { fade } from 'svelte/transition'
</script>

<div
  class="z-10 bg-black bg-opacity-30 fixed top-0 left-0 right-0 bottom-0 flex place-items-center"
  transition:fade="{{ duration: 100 }}"
  on:click
>
  <slot />
</div>
