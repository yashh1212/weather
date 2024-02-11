const apiurl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const apikey="dd9f11ff6d3da53386f3a0a3fce3008b";

async function checkweather(city){
const response=await fetch(apiurl +city+ `&appid=${apikey}`);
var data= await response.json();
console.log(data);
// geolocation();

document.querySelector(".city").innerHTML=data.name;
// document.querySelector(".weat").innerHTML=data.weather[0].main;
document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
document.querySelector(".weather-status").innerHTML=data.weather[0].main;

document.querySelector(".humidity").innerHTML=`${data.main.humidity}%`;
document.querySelector(".wind").innerHTML=`${data.wind.speed}km/hr`;
document.querySelector(".temp-feel").innerHTML=`${data.main.feels_like}°C`;
document.querySelector(".air-p").innerHTML=`${data.main.pressure}hpa`;
document.querySelector(".visibility").innerHTML=`${(data.visibility)/1000}km`;
document.querySelector(".UV").innerHTML=`${1}`;


const sunrisetimestamp=data.sys.sunrise;
const sunsettimestamp=data.sys.sunset;

const sunsetdate=new Date(sunsettimestamp*1000);
const sunset=sunsetdate.toLocaleTimeString('en-us',{hour12: false,hour:'2-digit',minute:"2-digit"});

const sunrisedate=new Date(sunrisetimestamp*1000);
const sunrise=sunrisedate.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'});


document.querySelector(".sunset-time").innerHTML=`${sunset}`;
document.querySelector(".sunrise-time").innerHTML=`${sunrise}`;

const img=document.querySelector("#weather-icon");
img.classList.remove("hide");

const weaterarr=["Smoke","Dizzle","Clear","Clouds","Mist","Humidity","Rain","Snow","Wind","Haze","Smoke"];

weaterarr.forEach((element)=>{
    if (element==data.weather[0].main){
        img.src=`images/${element}.png`;
    }
});

// if(data.weather[0].main == "Clear"){
//     img.src='images/clear.png';
// }
// else if(data.weather[0].main == "Clouds"){
//     img.src='images/clouds.png';
// }
// else if((data.weather[0].main) == "Dizzle"){
//     img.src='images/dizzle.png';
// }
// else if(data.weather[0].main == "Mist"){
//     img.src='images/mist.png';
// }
// else if(data.weather[0].main == "Humidity"){
//     img.src='images/humidity.png';
// }
// else if(data.weather[0].main == "Rain"){
//     img.src='images/rain.png';
// }
// else if(data.weather[0].main == "Snow"){
//     img.src='images/snow.png';
// }
// else if(data.weather[0].main == "Wind"){
//     img.src='images/wind.png';
// }
// else if(data.weather[0].main == "Haze"){
//     img.src='images/haze.png';
// }
// else if(data.weather[0].main == "Smoke"){
//     img.src='images/haze.png';
// }
}
function getLocation() {
    try{

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position)=>{
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                let city=await getCityName(latitude,longitude);
                checkweather(city);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        
    }
    catch(error){
        alert(error);
    }
  }


  async function getCityName(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.address && data.address.city) {
            return data.address.city;
        } else if (data.address && data.address.town) {
            return data.address.town;
        } else if (data.address && data.address.village) {
            return data.address.village;
        } else if (data.address && data.address.hamlet) {
            return data.address.hamlet;
        } else {
            return "City name not found";
        }
    } catch (error) {
        console.error("Error fetching city name:", error);
        return "Error fetching city name";
    }
}

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

let buttom= document.getElementById("search");
let gelocation= document.getElementById("location");


buttom.addEventListener("click",()=>{
    let city= document.querySelector(".input").value;
    checkweather(city);
})
gelocation.addEventListener("click",()=>{
    getLocation();   
    getCityName(latitude,longitude);
});

