import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const apiKey = "164e0ed51391d16bfb5ba7947b8b1dcc";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input') as HTMLInputElement;

  const todayWeatherInfo = document.querySelector('.today-weather-info') as HTMLDivElement;

  const selectedCountryCity = document.querySelector('.country-city-selected') as HTMLSpanElement;
  const temperature = document.querySelector('.temperature') as HTMLDivElement;
  const feelsLike = document.querySelector('.feels-like') as HTMLDivElement;
  const precipination = document.querySelector('.precipitation') as HTMLDivElement;
  const countryCity = document.querySelector('.country-city') as HTMLDivElement;

  function clearWeatherInfo() {
    todayWeatherInfo.style.display = 'none';
    selectedCountryCity.innerHTML = '';
    temperature.innerHTML = '';
    feelsLike.innerHTML = '';
    precipination.innerHTML = '';
    countryCity.innerHTML = '';
  }

  async function checkWeather(city: string) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    let data = await response.json();

    if (data.cod != 404 && data.cod != 400) {
      searchInput.placeholder = 'Search city';

      todayWeatherInfo.style.display = 'grid';

      selectedCountryCity.innerHTML = `${data.name}, ${data.sys.country}`;
      temperature.innerHTML = `${data.main.temp}°C`;
      feelsLike.innerHTML = `Feels like: ${data.main.feels_like}°C`;
      precipination.innerHTML = `${data.weather[0].main}`;
      countryCity.innerHTML = `${data.name}, ${data.sys.country}`;
    } else {
      searchInput.placeholder = 'City not found';

      clearWeatherInfo();
    }
  }

  searchButton?.addEventListener('click', () => {
    if (searchInput.value !== '') {
      checkWeather(searchInput.value);
      searchInput.value = '';
    }
  })
})