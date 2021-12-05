const API_KEY = 'AIzaSyCO0eT8a8507-un6p7aNNdJ_VF22jtcHW4';

let sdkEmbedded = false;

function embedSdk() {
  return new Promise((resolve, reject) => {
    if (sdkEmbedded) {
      return resolve();
    }

    sdkEmbedded = true;
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3&libraries=places`;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s)
  })
}

/**
 * Makes an input element autocompletable with Google Maps results
 * @param {HTMLInputElement} element
 */
export const autocomplete = async (element) => {
  await embedSdk();
  return new google.maps.places.Autocomplete(
    element,
    { types: ['geocode'] }
  );
};


export const gmap = async (element) => {
  const gmapAutocomplete = await autocomplete(element)
  gmapAutocomplete.addListener('place_changed', () => {
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
    const detail = {
      location,
      minutesOffset: place.utc_offset_minutes,
      coords: `${coordinates.lat()};${coordinates.lng()}`,
    };

    element.value = location;
    element.dispatchEvent(new CustomEvent('placeselected', { detail }))
  })

  return {
    destroy() {}, 
  }
}
