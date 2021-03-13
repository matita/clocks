<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    a {
      @apply text-primary-600;
    }
  }
</style>

<script>
  import SearchForm from './components/SearchForm.svelte';
  import Footer from './components/Footer.svelte';
  import Clocks from './components/Clocks.svelte';
  import AddClocks from './organisms/AddClocks.svelte';
  import { serializeClocks, deserializeClocks } from './utils';
  import clocks from './stores/clocks';

  // Load clocks from localStorage
  try {
    JSON.parse(localStorage['clocks_items']).forEach(clocks.add);
  } catch (err) {
    console.log('error while loading from localStorage', err);
    // do nothing
  }

  // Get clocks from URL
  const params = new URLSearchParams(location.search.substr(1));
  const clocksFromUrl = deserializeClocks(params.get('clocks'))
    .filter((clock) => !clocks.has(clock));

  history.replaceState({}, 'Clocks', `?`);
  // Wait some time to add clocks from URL, so it's more clear that they've been just added
  // setTimeout(() => {
  //   clocksFromUrl.forEach(clocks.add);
  // }, 200);

  clocks.subscribe((clocks) => localStorage['clocks_items'] = JSON.stringify(clocks.filter((c) => !c.isLocal)));

  let addClocksOpen = !!clocksFromUrl.length;

  function onLocationSelected({ detail }) {
    clocks.add(detail);
  }
</script>

<div class="flex-grow">
  <div class="max-w-xl mx-auto my-4 text-gray-600">
    <SearchForm on:locationselected={onLocationSelected} />

    <Clocks clocks={$clocks} showLocal showMenu />
  </div>
</div>

<Footer />

{#if addClocksOpen}
  <AddClocks clocks={clocksFromUrl} on:close={() => addClocksOpen = false} />
{/if}
