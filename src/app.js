import Data from "../config.js";
import "./style.css";
import fetchData from "../modules/fetchData.js";
import { removeAllChildren } from "../modules/rmAllChildElem.js";
import { DateTime } from "luxon";

// Event will start on a keyup action
const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keyup", async (event) => {
  if (event.key === "Enter") {
    // Store target in variable
    const thisCity = event.target.value.toLowerCase();
    event.target.value = "";

    fetchWeatherData(thisCity);
  }
});

const fetchWeatherData = async (thisCity) => {
  // Fetching first api to get the City coordinates
  const geoData = await fetchData(
    `http://api.openweathermap.org/geo/1.0/direct?q=${thisCity}&appid=${Data.key}`
  );

  if (geoData.length === 0) {
    // If there are errors, send out an error message
    console.error("Error:", "not a place!");

    removeAllChildren("container");

    alert("Are you sure you aren't holding your map upside down?");
  } else {
    const cityNameContainer = document.querySelector(".city-name");
    cityNameContainer.innerHTML = geoData[0].name;

    // Fetching data according to the coordinates
    let onecallData = await fetchData(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=${Data.key}`
    );
    if (onecallData.cod === "200") {
      showWeatherData(onecallData);
    }
  }
};

const showWeatherData = (onecallData) => {
  console.log(
    "Welcome to this basic weather app. this is not a product but the product of an academic exercise."
  );

  removeAllChildren("container");

  // Looping through 5 days of weather data
  for (let i = 0; i < 5; i++) {
    createMap(onecallData, i);
  }
};

const createMap = (onecallData, index) => {
  // const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // Use the remainder operator (%) to switch from saturday (last in array) back to sunday (first in array)
  // const date = new Date();
  // let dayOfTheWeek = weekdays[(date.getDay() + index) % 7];
  let dayOfTheWeek = DateTime.local().plus({ days: `${index}` }).weekdayLong;

  const data = onecallData.daily[index];

  // Create the elements with Data
  const card = document.createElement("div");
  card.classList.add("card");

  const container = document.querySelector(".container");
  container.appendChild(card);

  const imageBox = document.createElement("div");
  imageBox.classList.add("imgBx");
  card.appendChild(imageBox);

  const cardImg = document.createElement("img");
  cardImg.src =
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  imageBox.appendChild(cardImg);

  const contentBox = document.createElement("div");
  contentBox.classList.add("contentBx");
  card.appendChild(contentBox);

  const cardHeader = document.createElement("h2");
  cardHeader.innerHTML = dayOfTheWeek;
  contentBox.appendChild(cardHeader);

  const tempDescription = document.createElement("h4");
  tempDescription.innerHTML = data.weather[0].description;
  contentBox.appendChild(tempDescription);

  const currentTempBox = document.createElement("div");
  currentTempBox.classList.add("color");
  contentBox.appendChild(currentTempBox);

  const currentTempHeader = document.createElement("h3");
  currentTempHeader.innerHTML = "Temp:";
  currentTempBox.appendChild(currentTempHeader);

  const currentTemp = document.createElement("span");
  currentTemp.classList.add("current-temp");
  currentTemp.innerHTML = data.temp.day + "°C";
  currentTempBox.appendChild(currentTemp);

  const minMaxTemperatures = document.createElement("div");
  minMaxTemperatures.classList.add("details");
  contentBox.appendChild(minMaxTemperatures);

  const minMaxTempHeader = document.createElement("h3");
  minMaxTempHeader.innerHTML = "More:";
  minMaxTemperatures.appendChild(minMaxTempHeader);

  const minTemp = document.createElement("span");
  minTemp.classList.add("min-temp");
  minTemp.innerHTML = data.temp.min + "°C";
  minMaxTemperatures.appendChild(minTemp);

  const maxTemp = document.createElement("span");
  maxTemp.classList.add("max-temp");
  maxTemp.innerHTML = data.temp.max + "°C";
  minMaxTemperatures.appendChild(maxTemp);
};
