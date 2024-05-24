document.addEventListener('DOMContentLoaded', () => {
    const countryContainer = document.getElementById('countries-wrapper');
    const searchBox = document.getElementById('search-country');
    const regionDropdown = document.getElementById('region-select');
    const modeToggleBtn = document.getElementById('toggle-theme');
    let countryData = [];

    const apiEndpoint = 'https://restcountries.com/v3.1/all';

    // Fetch country data
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            countryData = data;
            renderCountries(countryData);
        });

    // Render countries
    function renderCountries(countries) {
        countryContainer.innerHTML = '';
        countries.forEach(country => {
            const countryBox = document.createElement('div');
            countryBox.className = 'country-box';
            if (document.body.classList.contains('dark-theme')) {
                countryBox.classList.add('dark-theme');
            }
            countryBox.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name.common} Flag">
                <div class="info">
                    <h2>${country.name.common}</h2>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            `;
            countryBox.addEventListener('click', () => {
                window.location.href = `detail.html?name=${country.name.common}`;
            });
            countryContainer.appendChild(countryBox);
        });
    }

    // Filter countries by search input
    searchBox.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredCountries = countryData.filter(country => 
            country.name.common.toLowerCase().includes(query)
        );
        renderCountries(filteredCountries);
    });

    // Filter countries by region
    regionDropdown.addEventListener('change', (e) => {
        const selectedRegion = e.target.value;
        if (selectedRegion === 'all') {
            renderCountries(countryData);
        } else {
            const filteredCountries = countryData.filter(country => 
                country.region === selectedRegion
            );
            renderCountries(filteredCountries);
            updateCountryBoxThemes();
        }
    });

    // Toggle dark theme
    modeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        updateCountryBoxThemes();
        localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
    });

    // Update theme for all country boxes
    function updateCountryBoxThemes() {
        const countryBoxes = document.querySelectorAll('.country-box');
        countryBoxes.forEach(box => {
            if (document.body.classList.contains('dark-theme')) {
                box.classList.add('dark-theme');
            } else {
                box.classList.remove('dark-theme');
            }
        });
    }

    // Load dark theme preference
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
    }
});
