<script>
  import SearchForm from './components/SearchForm.svelte';
  import Footer from './components/Footer.svelte';
  import Clocks from './components/Clocks.svelte';
  import { serializeClocks, deserializeClocks } from './utils';

  const params = new URLSearchParams(location.search.substr(1));
  const date = new Date();

  let clocks = [{
    name: '',
    location: 'local',
    isLocal: true,
  }].concat(deserializeClocks(params.get('clocks')));



  function onLocationSelected({ detail }) {
    clocks.push(detail);
    history.replaceState({}, 'Clocks', `?clocks=${serializeClocks(clocks)}`);
    clocks = clocks.sort((c1, c2) => c1.minutesOffset - c2.minutesOffset);
  }
</script>

<div class="main">
  <SearchForm on:locationselected={onLocationSelected} />

  <Clocks {clocks} />
</div>

<Footer />
