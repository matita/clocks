<script>
  import './SearchForm.css';
  import { onMount, createEventDispatcher } from 'svelte';
  import { autocomplete } from '../api/maps';

  let input;
  let gmapAutocomplete;
  const dispatch = createEventDispatcher();

  onMount(async () => {
    gmapAutocomplete = await autocomplete(input);
    gmapAutocomplete.addListener('place_changed', onPlaceSelected);
  });

  function onPlaceSelected() {
    const place = gmapAutocomplete.getPlace();
    const coordinates = place.geometry.location;

    const data = {
      location: place.formatted_address,
      lat: coordinates.lat(),
      lng: coordinates.lng(),
      minutesOffset: place.utc_offset_minutes,
    }
    input.value = '';
    dispatch('locationselected', data);
  }
</script>

<div class="search-form">
  <label class="search-label" for="search-text">What time is it in</label>
  <input bind:this={input} class="search-text" id="search-text" type="search" placeholder="some city" >
</div>
