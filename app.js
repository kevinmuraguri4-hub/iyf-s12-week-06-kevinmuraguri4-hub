const BASE_URL="https://api.openweathermap.org/data/2.5/weather";
const form=document.getElementById("search-form"),cityInput=document.getElementById("city-input"),loading=document.getElementById("loading"),errorBox=document.getElementById("error"),weatherDisplay=document.getElementById("weather-display");
const cityName=document.getElementById("city-name"),weatherIcon=document.getElementById("weather-icon"),temperature=document.getElementById("temperature"),description=document.getElementById("description"),feelsLike=document.getElementById("feels-like"),humidity=document.getElementById("humidity"),wind=document.getElementById("wind"),pressure=document.getElementById("pressure"),historyList=document.getElementById("search-history"),unitToggle=document.getElementById("unit-toggle");
let latestWeather=null,unit="C";
function showLoading(){loading.classList.remove("hidden");weatherDisplay.classList.add("hidden");errorBox.classList.add("hidden");}
function hideLoading(){loading.classList.add("hidden");}
function showError(message){errorBox.textContent=message;errorBox.classList.remove("hidden");}
function displayWeather(data){
 latestWeather=data;cityName.textContent=`${data.name}, ${data.sys.country}`;weatherIcon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;weatherIcon.alt=data.weather[0].description;
 description.textContent=data.weather[0].description;humidity.textContent=`${data.main.humidity}%`;wind.textContent=`${data.wind.speed} m/s`;pressure.textContent=`${data.main.pressure} hPa`;
 renderTemperature();weatherDisplay.classList.remove("hidden");
}
function renderTemperature(){if(!latestWeather)return;const c=latestWeather.main.temp,feels=latestWeather.main.feels_like;temperature.textContent=`${unit==="C"?Math.round(c):Math.round(c*9/5+32)}°${unit}`;feelsLike.textContent=`${unit==="C"?Math.round(feels):Math.round(feels*9/5+32)}°${unit}`;unitToggle.textContent=unit==="C"?"Show °F":"Show °C";}
async function getWeather(city){
 if(typeof API_KEY==="undefined"||!API_KEY.trim()){showError("API key missing. Copy config.example.js to config.js and add your OpenWeatherMap API key.");return;}
 showLoading();
 try{
  const url=`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(API_KEY)}&units=metric`;
  const response=await fetch(url);
  if(!response.ok){if(response.status===404)throw new Error("City not found. Check the spelling and try again.");if(response.status===401)throw new Error("API key is not valid or is not active yet. Check your key and try again later.");throw new Error(`Weather request failed (HTTP ${response.status}).`);}
  const data=await response.json();displayWeather(data);saveToHistory(data.name);
 }catch(err){showError(err instanceof TypeError?"Network error. Check your internet connection.":err.message);}
 finally{hideLoading();}
}
function loadHistory(){try{return JSON.parse(localStorage.getItem("week6-weather-history"))||[];}catch{return [];}}
function saveToHistory(city){const history=[city,...loadHistory().filter(item=>item.toLowerCase()!==city.toLowerCase())].slice(0,5);localStorage.setItem("week6-weather-history",JSON.stringify(history));renderHistory();}
function renderHistory(){historyList.replaceChildren();loadHistory().forEach(city=>{const li=document.createElement("li"),button=document.createElement("button");button.type="button";button.textContent=city;button.addEventListener("click",()=>{cityInput.value=city;getWeather(city);});li.append(button);historyList.append(li);});}
form.addEventListener("submit",event=>{event.preventDefault();const city=cityInput.value.trim();if(city)getWeather(city);});
unitToggle.addEventListener("click",()=>{unit=unit==="C"?"F":"C";renderTemperature();});
renderHistory();
