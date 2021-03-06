<script>
  import SearchForm from './components/SearchForm.svelte';
  import Footer from './components/Footer.svelte';
  import Clocks from './components/Clocks.svelte';

  const date = new Date();

  let clocks = [{
    name: '',
    location: 'local',
    isLocal: true,
    minutesOffset: -date.getTimezoneOffset(),
  }];

  function onLocationSelected({ detail }) {
    clocks.push(detail);
    clocks = clocks.sort((c1, c2) => c1.minutesOffset - c2.minutesOffset);
  }
</script>

<div class="main">
  <SearchForm on:locationselected={onLocationSelected} />

  <input type="radio" id="no-clock" name="clock-actions">
  <Clocks {clocks} />
</div>

<Footer />
