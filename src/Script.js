let searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  let weatherIcon = document.querySelector(".weather-icon");
  let weatherDescription = document.querySelector(".weather-description");
  let weatherTempDegree = document.querySelector(".weather-temp");
  let inputField = document.querySelector(".input-field").value;
  let date = new Date();
  let dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
    date
  );

  let weatherDate = document.querySelector(".weather-date");
  let apiKey = "b0ec7ece4fe34e45b19180844242007";
  let days = 6;
  // let icon = document.querySelector(".icon");
  // let forcastTemp = document.querySelector(".forcast-temp");
  // let dates = document.querySelector(".date");

  let miniForcastDisplay = document.querySelector(".miniforcast-display");

  let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputField}&days=${days}&aqi=no&alerts=no`;

  const getUrl = async () => {
    const response = await fetch(url);
    const showResponse = await response.json();
    console.log(showResponse);
    displayWeather(showResponse.forecast.forecastday);
    weatherIcon.innerHTML = `<img src="https:${showResponse.current.condition.icon}" class="weather-icon alt="Weather Icon">`;
    weatherDescription.innerHTML = showResponse.current.condition.text;
    weatherTempDegree.innerHTML = `<h2>${showResponse.current.temp_c}&deg;C</h2>`;
    weatherDate.innerHTML = formattedDate;
    // icon.innerHTML = `<img src=""/>`
    // forcastTemp.innerHTML = `<h2></h2>`;
  };

  const displayWeather = (forecastday) => {
    miniForcastDisplay.innerHTML = "";
    forecastday.forEach((day) => {
      let weatherDisplay = document.createElement("div");
      weatherDisplay.className = "mini-display"
      weatherDisplay.innerHTML = `
      <img src="https:${day.day.condition.icon}" class="icon" />
      <p class="text">${day.day.condition.text}</p>
      <h2 class="forcast-temp">${day.day.avgtemp_c}&deg;C</h2>
      <h4 class="date">${day.date}</h4>
      `;
      miniForcastDisplay.appendChild(weatherDisplay);
    });
  };
  getUrl();
});
