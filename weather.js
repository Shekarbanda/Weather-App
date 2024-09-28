let link="https://api.openweathermap.org/data/2.5/weather?q={user.value}&appid=06d66e5d1c75e158bc86f701a4495487"



let submit=document.querySelector(".submit");
let div=document.querySelector(".info");
let city=document.querySelector(".city");
let temp=document.querySelector(".temp");
let des=document.querySelector(".description");
let humidity=document.querySelector(".humidity");
let windSpeed=document.querySelector(".windSpeed");
let icon=document.querySelector(".icon");
let user_input=document.querySelector(".user");
let load=document.querySelector(".load");


user_input.onkeyup=(e)=>{
    if(user_input.value.trim()!=0){
        submit.classList.add("submit2");
        if(e.key==="Enter")
    {
        get_weather()
    }
    }
    else{
        submit.classList.remove("submit2");
    }
}

submit.addEventListener("click",get_weather);

async function get_weather(){
    div.style.display="none";
    load.style.display="block";
    let user=document.querySelector(".user").value.toLowerCase();
    if(user!==""){
    let user=document.querySelector(".user").value.toLowerCase();
    const data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${user}&appid=06d66e5d1c75e158bc86f701a4495487`);
    load.style.display="none";
    const json_data=await data.json();
    const cod=json_data.cod;

    div.style.display="flex";
    

    if(cod!=404 && cod!=400){
        city.innerText=`City Name: ${user}`;
        temp.innerText=`Temperature: ${(json_data.main.temp-273.15).toFixed(1)}°C`
        des.innerText=json_data.weather[0].description;
        humidity.innerText=`Humidity: ${json_data.main.humidity}%`;
        windSpeed.innerText=`Wind Speed: ${(json_data.wind.speed).toFixed(1)} KMPH`;
        icon.src=`https://openweathermap.org/img/w/${json_data.weather[0].icon}.png`;
        icon.style.display="block";
    }   
    else{
        city.innerText=`City Not Found`;
        des.innerText="";
        temp.innerText="";
        humidity.innerText="";
        windSpeed.innerText="";
        icon.style.display="none";
    }
}
    else{
        alert("Enter city name");
        load.style.display="none";
    }
}