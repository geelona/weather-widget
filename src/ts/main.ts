import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const apiKey = "164e0ed51391d16bfb5ba7947b8b1dcc";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  const fiveDaysApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric"

  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input') as HTMLInputElement;

  const todayWeatherInfoContainer = document.querySelector('.today-weather-info-container') as HTMLDivElement;
  const fiveDaysWeatherInfoContainer = document.querySelector('.five-days-weather-info-container') as HTMLDivElement;

  interface WeatherData {
    name: string;
    main: {
      temp: number;
      feels_like: number;
    };
    sys: {
      country: string;
    };
    weather: {
      main: string;
    }[];
  }

  function toHtml(data: WeatherData) {
    const html = `
      <h2>Selected: <span class="country-city-selected">${data?.name}, ${data.sys.country}</span></h2>
      <div class="today-weather-info">
        <div class="temperature">${data.main.temp}°C</div>
        <div class="precipitation">${data.weather[0].main}</div>
        <div class="feels-like">Feels like: ${data.main.feels_like}°C</div>
        <div class="country-city">${data.name}, ${data.sys.country}</div>
      </div>
      `

    return html;
  }

  function toHtmlFiveDays(data: any, dd: number) {
    let dayData = dd + 1;
    let html = '';

    for (let i=0; i<data.list.length; i++) {
      if (dayData == data.list[i].dt_txt.slice(8, 10)) {
        html += `
        <div class="five-days-element">
          <div>${data.list[i].dt_txt.slice(0, 10)}</div>
          <div>${data.list[i].main.temp}°C</div>
          <div>${data.list[i].weather[0].main}</div>
          <div>Feels like: ${data.list[i].main.feels_like}°C</div>
        </div>
        `
        dayData++;
      }
    }

    return html;
  }

  function displayWeatherInfo(todayHtml: string, fiveDaysHtml: string) {
    todayWeatherInfoContainer.insertAdjacentHTML('afterbegin', todayHtml)
    fiveDaysWeatherInfoContainer.insertAdjacentHTML('afterbegin', fiveDaysHtml)
  }

  function clearWeatherInfo() {
    todayWeatherInfoContainer.innerHTML = '';
    fiveDaysWeatherInfoContainer.innerHTML = '';
  }

  async function checkWeather(city: string) {
    const dd = new Date().getDate();

    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    const data = await response.json();

    const responseFiveDays = await fetch(fiveDaysApiUrl + `&q=${city}` + `&appid=${apiKey}`);
    const dataFiveDays = await responseFiveDays.json();

    clearWeatherInfo();

    if (data.cod != 404 && data.cod != 400) {
      searchInput.placeholder = 'Search city';
      displayWeatherInfo(toHtml(data), toHtmlFiveDays(dataFiveDays, dd))

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