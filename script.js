const apikey = "2ebd49a02e08c201db8ed1758cefbcea";
let btn = document.getElementById("weather");


//FETCH THE WEATHER
const getWeather = async (city) => {

        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
        );
        const data = await response.json();
        //console.log(data);
        if(data.cod==='404'){

           let element = document.getElementById("alert");
           element.classList.remove("alert-hide");
           document.querySelector(".alert button").addEventListener("click", function () {
        
               element.classList.add("alert-hide");
        });
           setTimeout(() => {
               element.classList.add("alert-hide");
           }, 5000);
        }
        else{

            displayWeather(data);
        } 
   
}


//POPULATE THE DOM
const displayWeather = (data) => {
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
    if (description == "mist") {
        document.body.style.backgroundImage = "url('images/mist.jpg')";
    }
    if (description == "haze") {
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    }
    if (description == "clear sky") {
        document.body.style.backgroundImage = "url('images/clear-sky.jpg')";
    }
    if (description == "overcast clouds") {
        document.body.style.backgroundImage = "url('images/overcast-clouds.jpg')";
    }
    if (description == "broken clouds" || "scattered clouds") {
        document.body.style.backgroundImage = "url('images/broken-clouds.jpg')";
    }
    else {
        "url('https://source.unsplash.com/1600x900/?" +
            description +
            name +
            ",sky')";
    }

}

//FUNCTION CALL
const weatherSearch = () => {
    getWeather(document.querySelector(".search-bar").value);
}

document.querySelector(".search button").addEventListener("click", function () {
    weatherSearch();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weatherSearch();
    }
});
