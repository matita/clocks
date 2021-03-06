<script>
  import './Clocks.css';
  import Clock from './Clock.svelte';
  import clocks from '../stores/clocks';

  let dateMs = Date.now()
  $: sortedClocks = $clocks.sort((c1, c2) => c1.minutesOffset - c2.minutesOffset)

  setInterval(() => dateMs = Date.now(), 100);
</script>

<div class="clocks">
  <p class="back-to-current-time">Back to current time</p>
  {#each sortedClocks as clock}
    <Clock {clock} {dateMs} />
  {/each}
</div>
