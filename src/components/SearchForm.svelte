<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { autocomplete } from '../api/maps';
  import searchText from '../stores/searchText';

  let input;
  let autocompletePromise;
  let gmapAutocomplete;
  const dispatch = createEventDispatcher();

  onMount(async () => {
    input.focus();
  });

  function onPlaceSelected() {
    const place = gmapAutocomplete.getPlace();
    if (!place || !place.geometry) {
      return;
    }

    console.log('place', place);

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
    // searchText.search(text);

    if (!autocompletePromise) {
      autocompletePromise = autocomplete(input);
      gmapAutocomplete = await autocompletePromise;
      gmapAutocomplete.addListener('place_changed', onPlaceSelected);
    }
  }
</script>

<div class="flex place-items-center rounded-xl bg-white px-4 py-2 my-4">
  <label for="search-text" class="flex-none whitespace-nowrap">What time is it in</label>
  <input
    bind:this={input}
    class="mx-2 px-1 py-2 w-1 flex-grow focus:outline-none focus:ring-1 ring-primary-500 rounded-sm"
    id="search-text"
    type="search"
    placeholder="some city"
    on:input={onInput} >
</div>
