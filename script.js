document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const regionFilter = document.getElementById('regionFilter');
  const sortBtn = document.getElementById('get country');
  const countryCards = document.querySelectorAll('.country-card');
  const toggleDarkMode = document.getElementById('toggleDarkMode');
  const loading = document.getElementById('loading');
  const countriesContainer = document.getElementById('countries');

  // 1. Hide loading on page load
  loading.style.display = 'none';

  // 2. Live search
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    filterCountries(query, regionFilter.value);
  });

  // 3. Region filter
  regionFilter.addEventListener('change', () => {
    filterCountries(searchInput.value.toLowerCase(), regionFilter.value);
  });

  // 4. Sort alphabetically by country name
  sortBtn.addEventListener('click', () => {
    const cards = Array.from(document.querySelectorAll('.country-card'));
    const sorted = cards.sort((a, b) => {
      const nameA = a.querySelector('h3').textContent;
      const nameB = b.querySelector('h3').textContent;
      return nameA.localeCompare(nameB);
    });

    // Re-append sorted cards
    sorted.forEach(card => countriesContainer.appendChild(card));
  });

  // 5. Toggle dark mode
  toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Utility function for filtering
  function filterCountries(searchText, region) {
    countryCards.forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const cardRegion = card.getAttribute('data-region');

      const matchesSearch = name.includes(searchText);
      const matchesRegion = region === '' || cardRegion === region;

      if (matchesSearch && matchesRegion) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
});

