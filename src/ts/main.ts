import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const apiKey = "164e0ed51391d16bfb5ba7947b8b1dcc";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input') as HTMLInputElement;

  const todayWeatherInfoContainer = document.querySelector('.today-weather-info-container') as HTMLDivElement;

  function toHtml(data: any) {
    const html = `
    <h2>Selected: <span class="country-city-selected">${data.name}, ${data.sys.country}</span></h2>
    <div class="today-weather-info">
      <div class="temperature">${data.main.temp}°C</div>
      <div class="precipitation">${data.weather[0].main}</div>
      <div class="feels-like">Feels like: ${data.main.feels_like}°C</div>
      <div class="country-city">${data.name}, ${data.sys.country}</div>
    </div>
    `

    return html;
  }

  function displayWeatherInfo(html: any) {
    todayWeatherInfoContainer.insertAdjacentHTML('afterbegin', html)
  }

  function clearWeatherInfo() {
    todayWeatherInfoContainer.innerHTML = '';
  }

  async function checkWeather(city: string) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    let data = await response.json();
    clearWeatherInfo();

    if (data.cod != 404 && data.cod != 400) {
      searchInput.placeholder = 'Search city';
      displayWeatherInfo(toHtml(data))

    } else {
      searchInput.placeholder = 'City not found';
    }
  }

  searchButton?.addEventListener('click', () => {
    if (searchInput.value !== '') {
      checkWeather(searchInput.value);
      searchInput.value = '';
    }
  })
})