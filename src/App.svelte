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
  import ClockEditModal from './components/ClockEditModal.svelte';
  import { deserializeClocks } from './utils';
  import clocks from './stores/clocks';
  import clocksToAdd from './stores/clocksToAdd';
  import CreateClockBtn from './components/CreateClockBtn.svelte';

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
  clocksFromUrl.forEach((clock) => clocksToAdd.add(clock));

  history.replaceState({}, 'Clocks', `?`);
  // Wait some time to add clocks from URL, so it's more clear that they've been just added
  // setTimeout(() => {
  //   clocksFromUrl.forEach(clocks.add);
  // }, 200);

  clocks.subscribe((clocks) => localStorage['clocks_items'] = JSON.stringify(clocks.filter((c) => !c.isLocal)));

  $: addClocksOpen = $clocksToAdd.length;

  function onLocationSelected({ detail }) {
    clocksToAdd.add(detail);
  }

  function onAddClockClick() {
    addClocksOpen = true;
  }
</script>

<div class="flex-grow">
  <div class="max-w-xl mx-auto my-4 text-gray-600 text-center">
    <div class="flex items-center">
      <SearchForm class="flex-grow" />
      <CreateClockBtn />
    </div>

    <Clocks clocks={$clocks} showLocal />
  </div>
</div>

<Footer />

{#if addClocksOpen}
  <AddClocks on:close={() => addClocksOpen = false} on:locationselected={onLocationSelected} />
{/if}

<ClockEditModal />
