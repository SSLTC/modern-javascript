/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Data = {\n   key : \"1ff8b4b537e2648831257bbfbba69d93\"\n }\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Data);\n\n//# sourceURL=webpack://verou-4-modern-javascript/./config.js?");

/***/ }),

/***/ "./modules/fetchData.js":
/*!******************************!*\
  !*** ./modules/fetchData.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nconst fetchData = async (apiUrl) => {\n    try {\n        let result = await fetch(apiUrl);\n        let Data = await result.json();\n    \n        return Data;\n\n    } catch (err) {\n        return err;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchData);\n\n//# sourceURL=webpack://verou-4-modern-javascript/./modules/fetchData.js?");

/***/ }),

/***/ "./modules/rmAllChildElem.js":
/*!***********************************!*\
  !*** ./modules/rmAllChildElem.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"removeAllChildren\": () => (/* binding */ removeAllChildren)\n/* harmony export */ });\n\nconst removeAllChildren = (className) => {\n    const container = document.querySelector(\".\" + className);\n\n    while (container.firstChild) {\n        container.removeChild(container.firstChild);\n    };\n}\n\n\n\n//# sourceURL=webpack://verou-4-modern-javascript/./modules/rmAllChildElem.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ \"./config.js\");\n/* harmony import */ var _modules_fetchData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/fetchData.js */ \"./modules/fetchData.js\");\n/* harmony import */ var _modules_rmAllChildElem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/rmAllChildElem.js */ \"./modules/rmAllChildElem.js\");\n\n\n\n\n// Event will start on a keyup action\nconst searchBar = document.querySelector('#searchBar');\nsearchBar.addEventListener('keyup', async (event) => {\n\n    if(event.key === \"Enter\") {\n        // Store target in variable\n        const thisCity = event.target.value.toLowerCase();\n        event.target.value = '';\n        \n        fetchWeatherData();\n    };\n});\n\nconst fetchWeatherData = async () => {\n    // Fetching first api to get the City coordinates\n    const geoData = await (0,_modules_fetchData_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(`http://api.openweathermap.org/geo/1.0/direct?q=${thisCity}&appid=${_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].key}`);\n\n    if (geoData.length === 0) {\n        // If there are errors, send out an error message\n        console.error('Error:', \"not a place!\");\n\n        (0,_modules_rmAllChildElem_js__WEBPACK_IMPORTED_MODULE_2__.removeAllChildren)(\"container\");\n        \n        alert(\"Are you sure you aren't holding your map upside down?\");\n    } else {\n        const cityNameContainer = document.querySelector('.city-name');\n        cityNameContainer.innerHTML = geoData[0].name;\n\n        // Fetching data according to the coordinates     \n        let onecallData = await (0,_modules_fetchData_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(`https://api.openweathermap.org/data/3.0/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=${_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].key}`);\n        if(onecallData.cod === '200') {\n            showWeatherData(onecallData);\n        }\n    }\n}\n\nconst showWeatherData = (onecallData) => {\n\n    console.log('Welcome to this basic weather app. this is not a product but the product of an academic exercise.')\n\n    ;(0,_modules_rmAllChildElem_js__WEBPACK_IMPORTED_MODULE_2__.removeAllChildren)(\"container\");\n\n    // Looping through 5 days of weather data\n    for(let i = 0; i < 5; i++) {\n        createMap(onecallData, i);\n    };\n}\n\nconst createMap = (onecallData, index) => {\n    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\n    // Use the remainder operator (%) to switch from saturday (last in array) back to sunday (first in array)\n    const date = new Date();\n    let dayOfTheWeek = weekdays[(date.getDay() + index) % 7];\n    const data = onecallData.daily[index];\n\n    // Create the elements with Data\n    const card = document.createElement('div');\n    card.classList.add(\"card\");\n    container.appendChild(card);\n\n    const imageBox = document.createElement('div');\n    imageBox.classList.add(\"imgBx\");\n    card.appendChild(imageBox);\n\n    const cardImg = document.createElement('img');\n    cardImg.src = \"http://openweathermap.org/img/wn/\" + data.weather[0].icon + \"@2x.png\";\n    imageBox.appendChild(cardImg);\n\n    const contentBox = document.createElement(\"div\");\n    contentBox.classList.add(\"contentBx\");\n    card.appendChild(contentBox);\n\n    const cardHeader = document.createElement(\"h2\");\n    cardHeader.innerHTML = dayOfTheWeek;\n    contentBox.appendChild(cardHeader);\n\n    const tempDescription = document.createElement(\"h4\");\n    tempDescription.innerHTML = data.weather[0].description;\n    contentBox.appendChild(tempDescription);\n\n    const currentTempBox = document.createElement(\"div\");\n    currentTempBox.classList.add(\"color\");\n    contentBox.appendChild(currentTempBox);\n\n    const currentTempHeader = document.createElement(\"h3\");\n    currentTempHeader.innerHTML = \"Temp:\"\n    currentTempBox.appendChild(currentTempHeader);\n\n    const currentTemp = document.createElement(\"span\");\n    currentTemp.classList.add(\"current-temp\");\n    currentTemp.innerHTML = data.temp.day + \"°C\";\n    currentTempBox.appendChild(currentTemp);\n\n    const minMaxTemperatures = document.createElement(\"div\");\n    minMaxTemperatures.classList.add(\"details\");\n    contentBox.appendChild(minMaxTemperatures);\n\n    const minMaxTempHeader = document.createElement(\"h3\");\n    minMaxTempHeader.innerHTML = \"More:\"\n    minMaxTemperatures.appendChild(minMaxTempHeader);\n\n    const minTemp = document.createElement(\"span\");\n    minTemp.classList.add(\"min-temp\")\n    minTemp.innerHTML = data.temp.min + \"°C\";\n    minMaxTemperatures.appendChild(minTemp);\n\n    const maxTemp = document.createElement(\"span\");\n    maxTemp.classList.add(\"max-temp\")\n    maxTemp.innerHTML = data.temp.max + \"°C\";\n    minMaxTemperatures.appendChild(maxTemp);\n}\n\n//# sourceURL=webpack://verou-4-modern-javascript/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;