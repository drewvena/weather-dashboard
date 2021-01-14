myFunction=function() {
    var inputEl = document.getElementById("city-input");
    var searchEl = document.getElementById("search-button");
    var clearEl = document.getElementById("clear-history");
    
    var historyEl = document.getElementById("history");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);
    
    var APIkey = "5bbac74e67189da529f39b7f6dbd81ba";
    function getWeather(cityName) {

                 fetch( "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey)
                
                .then(function(response){
                    console.log(response);
   
           
                });  
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
        
            renderSearchHistory();
            if (searchHistory.length > 0) {
                getWeather(searchHistory[searchHistory.length - 1]);
            }
        
        

        
        }
        myFunction();