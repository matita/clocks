<script>
  import Clock from './Clock.svelte'
  let clocks = [{
    id: 0,
    name: '',
    city: 'local',
    isLocal: true,
  }, {
    id: 1,
    name: 'some name',
    city: 'cityland',
    timezone: 1,
  }, {
    id: 2,
    name: 'some other name',
    city: 'townville',
    timezone: 2.5,
  }]
  let dateMs = Date.now()

  setInterval(() => dateMs = Date.now(), 100);
</script>

<div class="clocks">
  <p class="back-to-current-time">Back to current time</p>
  {#each clocks as clock}
    <Clock {clock} {dateMs} />
  {/each}
</div>
