// public/js/location.js
(async function () {
  const $country = document.getElementById('country');
  const $state = document.getElementById('state');
  const $city = document.getElementById('city');

  function setOptions(selectEl, items, placeholder = 'Select') {
    selectEl.innerHTML = `<option value="">${placeholder}</option>` +
      items.map(i => `<option value="${i}">${i}</option>`).join('');
  }

  async function fetchJSON(url) {
    const r = await fetch(url);
    return r.json();
  }

  // load countries
  try {
    const { data } = await fetchJSON('/locations/countries');
    setOptions($country, data, 'Country');
  } catch (e) { console.error(e); }

  $country.addEventListener('change', async () => {
    const c = $country.value;
    if (!c) { setOptions($state, [], 'State'); setOptions($city, [], 'City'); return; }
    const res = await fetchJSON(`/locations/states?country=${encodeURIComponent(c)}`);
    setOptions($state, res.data || [], 'State');
    setOptions($city, [], 'City');
  });

  $state.addEventListener('change', async () => {
    const c = $country.value, s = $state.value;
    if (!c || !s) return;
    const res = await fetchJSON(`/locations/cities?country=${encodeURIComponent(c)}&state=${encodeURIComponent(s)}`);
    setOptions($city, res.data || [], 'City');
  });
})();
