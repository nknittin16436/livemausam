let weather = {
    apikey: "2ebd49a02e08c201db8ed1758cefbcea",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apikey
        ) 
        
      .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed : " + Math.round(speed * 3.6) + "km/hr";
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".weather").classList.remove("loading");
        if(description=="mist")
        {
            document.body.style.backgroundImage ="url('images/mist.jpg')";
        }
        else if(description=="haze")
        {
            document.body.style.backgroundImage ="url('images/haze.jpg')";
        }
        else if(description=="clear sky")
        {
            document.body.style.backgroundImage ="url('images/clear-sky.jpg')";
        }
        else if(description=="overcast clouds")
        {
            document.body.style.backgroundImage ="url('images/overcast-clouds.jpg')";
        }
        else if(description== "broken clouds" || "scattered clouds")
        {
            document.body.style.backgroundImage ="url('images/broken-clouds.jpg')";
        }
        else{
            "url('https://source.unsplash.com/1600x900/?" +
            description +
            name +
            ",sky')";
        }
    },
    
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function () {
    if (event.key == "Enter") {
        weather.search();
    }
});
