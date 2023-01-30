import Data from "./config.js";

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Event will start on a keyup action
const searchBar = document.querySelector('#searchBar');
searchBar.addEventListener('keyup', async (event) => {
    // checking the action for specific key (Enter)
    if(event.key === "Enter") {
        // Store target in variable
        const thisCity = event.target.value.toLowerCase();
        event.target.value = '';
        // Fetching first api to get the City coordinates
        let geoData = await fetchGeoData(thisCity);

        // Fetching data according to the coordinates
        fetchForecastData(geoData);      
        let onecallData = await fetchOnecallData(geoData);

        // Show the data
        showData(onecallData);
    };
});

let fetchGeoData = async (thisCity) => {
    try {
        let result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${thisCity}&appid=${Data.key}`);
        let geoData = await result.json();
    
        return geoData;

    } catch (err) {
        // If there are errors, send out an error message
        console.error('Error:', "not a place!");
        const container = document.querySelector(".container");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        };
        return alert("Are you sure you aren't holding your map upside down?");
    }
}

let fetchForecastData = async (geoData) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${Data.key}`;

    let result = await fetch(apiUrl);
    let forecastData = await result.json();

    const cityNameContainer = document.querySelector('.city-name');
    cityNameContainer.innerHTML = forecastData.city.name;

    return forecastData;
}

let fetchOnecallData = async (geoData) => {

    let result = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=${Data.key}`);
    let onecallData = await result.json();

    return onecallData;
}

const showData = (onecallData) => {

    console.log('Welcome to this basic weather app. this is not a product but the product of an academic exercise.')

    // Removing all child elements from Container before creating new set of elements
    const container = document.querySelector(".container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };

    // Looping through 5 days of weather data
    for(let i = 0; i < 5; i++) {

        // Use the remainder operator (%) to switch from saturday (last in array) back to sunday (first in array)
        const date = new Date();
        let dayOfTheWeek = weekdays[(date.getDay() + i) % 7];
        const data = onecallData.daily[i];

        // Create the elements with Data
        const card = document.createElement('div');
        card.classList.add("card");
        container.appendChild(card);

        const imageBox = document.createElement('div');
        imageBox.classList.add("imgBx");
        card.appendChild(imageBox);

        const cardImg = document.createElement('img');
        cardImg.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
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
        currentTempHeader.innerHTML = "Temp:"
        currentTempBox.appendChild(currentTempHeader);

        const currentTemp = document.createElement("span");
        currentTemp.classList.add("current-temp");
        currentTemp.innerHTML = data.temp.day + "°C";
        currentTempBox.appendChild(currentTemp);

        const minMaxTemperatures = document.createElement("div");
        minMaxTemperatures.classList.add("details");
        contentBox.appendChild(minMaxTemperatures);

        const minMaxTempHeader = document.createElement("h3");
        minMaxTempHeader.innerHTML = "More:"
        minMaxTemperatures.appendChild(minMaxTempHeader);

        const minTemp = document.createElement("span");
        minTemp.classList.add("min-temp")
        minTemp.innerHTML = data.temp.min + "°C";
        minMaxTemperatures.appendChild(minTemp);

        const maxTemp = document.createElement("span");
        maxTemp.classList.add("max-temp")
        maxTemp.innerHTML = data.temp.max + "°C";
        minMaxTemperatures.appendChild(maxTemp);
    };
}