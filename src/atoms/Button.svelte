<script>
  export let primary= false
</script>

<button
  type="button"
  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"

  class:bg-primary-600={primary}
  class:hover:bg-primary-700={primary}

  class:border-gray-300={!primary}
  class:bg-white={!primary}
  class:text-gray-700={!primary}
  class:hover:bg-gray-50={!primary}

  on:click
>
  <slot />
</button>
