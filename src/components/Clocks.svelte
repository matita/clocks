<script>
  import Clock from './Clock.svelte'
  export let clocks;

  let dateMs = Date.now()

  setInterval(() => dateMs = Date.now(), 100);
</script>

<div class="clocks">
  <p class="back-to-current-time">Back to current time</p>
  {#each clocks as clock}
    <Clock {clock} {dateMs} />
  {/each}
</div>
