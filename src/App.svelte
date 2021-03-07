<script>
  import SearchForm from './components/SearchForm.svelte';
  import Footer from './components/Footer.svelte';
  import Clocks from './components/Clocks.svelte';
  import { serializeClocks, deserializeClocks } from './utils';
  import clocks from './stores/clocks';

  const params = new URLSearchParams(location.search.substr(1));
  const date = new Date();

  // clocks.add({ name: '', location: 'Local', isLocal: true });
  deserializeClocks(params.get('clocks')).forEach(clocks.add);
  history.replaceState({}, 'Clocks', `?`);
  try {
    JSON.parse(localStorage['clocks_items']).forEach(clocks.add);
  } catch (err) {
    console.log('error while loading from localStorage', err);
    // do nothing
  }

  clocks.subscribe((clocks) => localStorage['clocks_items'] = JSON.stringify(clocks.filter((c) => !c.isLocal)));

  function onLocationSelected({ detail }) {
    clocks.add(detail);
  }
</script>

<div class="max-w-xl mx-auto m-4 text-gray-600">
  <SearchForm on:locationselected={onLocationSelected} />

  <Clocks />
</div>

<Footer />
