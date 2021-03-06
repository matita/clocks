<script>
  import './Clocks.css';
  import Clock from './Clock.svelte';
  import clocks from '../stores/clocks';

  let dateMs = Date.now()
  $: sortedZones = Object.entries(
      $clocks.reduce((zones, clock) => {
        const { minutesOffset } = clock;
        const zoneClocks = zones[minutesOffset] = zones[minutesOffset] || [];
        zoneClocks.push(clock);
        return zones;
      }, {})
    )
    .map(([minutesOffset, clocks]) => ({
      minutesOffset: +minutesOffset,
      clocks,
    }))
    .sort((c1, c2) => c1.minutesOffset - c2.minutesOffset);

  setInterval(() => dateMs = Date.now(), 100);
</script>

<div class="clocks">
  <p class="back-to-current-time">Back to current time</p>
  {#each sortedZones as zone}
    <Clock {zone} {dateMs} />
  {/each}
</div>
