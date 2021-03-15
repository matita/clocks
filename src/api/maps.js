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
