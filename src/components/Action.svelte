<script>
  export let danger = false;
</script>

<button
  class="uppercase px-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
  class:text-green-500={!danger}
  class:text-red-500={danger}
  on:click|stopPropagation
>
  <slot />
</button>
