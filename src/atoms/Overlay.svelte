<script>
  import { fade } from 'svelte/transition'
</script>

<div
  class="fixed z-10 bg-black bg-opacity-30 inset-0 flex place-items-center overflow-y-auto"
  transition:fade="{{ duration: 100 }}"
  on:click
>
  <slot />
</div>
