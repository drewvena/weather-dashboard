myFunction=function() {
    var inputEl = document.getElementById("city-input");
    var searchEl = document.getElementById("search-button");
    var clearEl = document.getElementById("clear-history");
   var nameEl = document.getElementById("city-name")
    var currentPicEl = document.getElementById("current-pic");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");4
    var currentWindEl = document.getElementById("wind-speed");
    var currentUVEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);

    var APIkey = "5bbac74e67189da529f39b7f6dbd81ba";
    function getWeather(cityName) {

                 fetch( "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + APIkey+'&units=imperial')
                .then(function(response){
                    return response.json();
                
                })
                
                .then(function(response){
                    var currentDate = new Date(response.dt*1000);
            console.log(currentDate);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            nameEl.innerHTML = response.name + " (" + month + "/" + day + "/" + year + ") "; 
                    var WeatherPic = response.weather[0].icon;
                    currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + WeatherPic + "@2x.png");
                    currentPicEl.setAttribute("alt",response.weather[0].description);
                    currentPicEl.innerHTML = WeatherPic
                    currentTempEl.innerHTML = "Temperature: " + (response.main.temp) ;
            currentHumidityEl.innerHTML = "Humidity: " + response.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.wind.speed + " MPH";
             
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uvURL= "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&cnt=1";
            fetch (uvURL)
            .then (function(response){
                return response.json();
            })
            .then (function(response){
                var UVIndex = document.createElement("span");
                UVIndex.setAttribute("class","badge badge-danger");
                UVIndex.innerHTML = response.value
                currentUVEl.innerHTML = "UV Index: ";
                currentUVEl.append(UVIndex);
            })
            
            
            var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+APIkey + "&units=imperial";
            fetch (forcastURL) 
            
            .then(function(response){
                return response.json();
            })
            .then (function(response){
                console.log (response)
                var forecastEl = document.querySelectorAll(".forecast")
                for (i=0; i<forecastEl.length; i++) {
                    forecastEl.innerHTML="";
                    var forecastIndex = i*8 + 4;
                    var forecastDate = new Date (response.list[forecastIndex].dt*1000 );
                    var forecastDay = forecastDate.getDate();
                    var forecastMonth = forecastDate.getMonth() + 1;
                    var forecastYear = forecastDate.getFullYear();
                    var forecastDateEl = document.createElement('p');
                    forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                    forecastDateEl.innerHTML= forecastMonth + "/"+forecastDay  + "/" + forecastYear;
                    forecastEl[i].append(forecastDateEl);
                    var forecastWeatherEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt",response.list[forecastIndex].weather[0].description);
                    forecastEl[i].append(forecastWeatherEl);
                    var forecastHumidityEl= document.createElement('p');
                    var forecastTempEl = document. createElement('p');
                    forecastTempEl.innerHTML = "Temp: "+ response.list[forecastIndex].main.temp + " °F"
                    forecastEl[i].append(forecastTempEl)
                    forecastHumidityEl.innerHTML = "Humidity: " + response.list[forecastIndex].main.humidity + "%";
                    forecastEl[i].append(forecastHumidityEl);
   
                }

            })
                })
            

            }
        
            searchEl.addEventListener("click",function() {
                var searchTerm = inputEl.value;
                getWeather(searchTerm);
                searchHistory.push(searchTerm);
                localStorage.setItem("search",JSON.stringify(searchHistory));
                renderSearchHistory();
                
                
            })
            clearEl.addEventListener("click",function() {
                searchHistory = [];
                localStorage.clear();
                renderSearchHistory();
            })

            function renderSearchHistory() {
                historyEl.innerHTML = "";
                for (let i=0; i<searchHistory.length; i++) {
                    var historyItem = document.createElement("input");
                    historyItem.setAttribute("type","text");
                    historyItem.setAttribute("readonly",true);
                    historyItem.setAttribute("class", "form-control d-block bg-white");
                    historyItem.setAttribute("value", searchHistory[i]);
                    historyItem.addEventListener("click",function() {
                        getWeather(historyItem.value);
                    })
                    historyEl.append(historyItem);

                }
            }
        
    
      
}
myFunction();