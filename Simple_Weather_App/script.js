const apiKey = "6953cdefc8cad9a5caf28250fe89119c"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

searchBtn.addEventListener("click", () => checkWeather());
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather();
  }
});

async function checkWeather() {
  const city = searchBox.value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found. Please check the spelling and try again.");
    }

    const data = await response.json();
    updateWeatherUI(data);
  } catch (err) {
    alert("⚠️ " + err.message);
    console.error(err);
  }
}

function updateWeatherUI(data) {
  cityName.innerText = data.name;
  temperature.innerText = Math.round(data.main.temp) + "°C";
  humidity.innerText = data.main.humidity + "%";
  wind.innerText = data.wind.speed + " km/hr";

  const weatherMain = data.weather[0].main.toLowerCase();
  const weatherIconCode = data.weather[0].icon;


  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;

  weatherIcon.title = data.weather[0].description;
}