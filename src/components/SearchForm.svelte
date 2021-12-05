<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { autocomplete } from '../api/maps';
  import searchText from '../stores/searchText';

  let className = void 0
  export { className as class }
  export let withGmaps = false;

  let input;
  let autocompletePromise;
  let gmapAutocomplete;
  const dispatch = createEventDispatcher();

  onMount(async () => {
    if (withGmaps) {
      gmapAutocomplete = await autocomplete(input);
      gmapAutocomplete.addListener('place_changed', onPlaceSelected);
    }
    input.focus();
  });

  function onPlaceSelected() {
    const place = gmapAutocomplete.getPlace();
    if (!place || !place.geometry) {
      return;
    }

    const addressComponents = place.address_components;
    const country = addressComponents.find((p) => p.types.indexOf('country') != -1)?.long_name;
    const region = addressComponents.find((p) => p.types.indexOf('administrative_area_level_1') != -1)?.long_name;
    const locality = addressComponents.find((p) => p.types.indexOf('locality') != -1)?.long_name;
    const location = [locality || region, country].filter((n) => !!n).join(', ') || place.formatted_address;

    const coordinates = place.geometry.location;

    const data = {
      location,
      minutesOffset: place.utc_offset_minutes,
      coords: `${coordinates.lat()};${coordinates.lng()}`,
    };
    input.value = '';
    dispatch('locationselected', data);
    searchText.reset();
  }

  async function onInput(ev) {
    ev.preventDefault();
    const text = ev.target.value;
    if (!withGmaps) {
      searchText.search(text);
    }
  }

  $: {
    if ($searchText.rawText && input !== document.activeElement) {
      setTimeout(() => {
        input.focus()

        const timeMatch = $searchText.rawText.match(/\d{1,2}:\d{1,2}/)
        if (timeMatch) {
          input.setSelectionRange(0, timeMatch[0].length)
        }

      }, 100);
    }
  }
</script>

<div class={`sticky top-4 z-10 flex place-items-center rounded-full bg-white pl-4 py-2 my-4 shadow-lg ${className}`}>
  <label for="search-text" class="flex-none whitespace-nowrap">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </label>
  <input
    bind:this={input}
    class="mx-2 px-4 py-2 flex-grow focus:outline-none focus:ring-1 ring-primary-500 rounded-full"
    id="search-text"
    type="search"
    value={$searchText.rawText}
    on:input={onInput} >
</div>
