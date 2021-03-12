<script>
  // import './Clocks.css';
  import Clock from './Clock.svelte';
  import clocks from '../stores/clocks';
  import searchText from '../stores/searchText';

  const localOffset = -new Date().getTimezoneOffset();

  $: clocksWithLocal = $clocks.concat({ minutesOffset: localOffset, name: '', location: 'Local', isLocal: true });

  $: sortedZones = Object.entries(
      clocksWithLocal
        .filter((clock) => (
          clock.isLocal
          || (clock.name || '').toLowerCase().indexOf($searchText) !== -1)
          || (clock.location || '').toLowerCase().indexOf($searchText) !== -1
        )
        .reduce((zones, clock) => {
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
</script>

<div class="">
  <!-- <p class="back-to-current-time">Back to current time</p> -->
  {#each sortedZones as zone (zone.minutesOffset)}
    <Clock {zone} />
  {/each}
</div>
