const apiKey = "bbd113e0e3b0746c8020277a46da832a";

const input = document.querySelector(".input")
const button = document.querySelector(".button")

const cityName = document.querySelector("#city")
const flag = document.querySelector(".bandeira")
const temperature = document.querySelector("#temperature span")

const description = document.querySelector("#description")
const descriptionImage = document.querySelector("#descriptionImage")

const humidity = document.querySelector(".humidadeNumber")
const wind = document.querySelector(".velocidadeDoAr")

const container = document.querySelector("#weather-data")
const errorMessage = document.querySelector("#error-message")

const toggleLoader = () => {
    loader.classList.toggle("hide");
  };

const APIResponse = async (city) => {

    toggleLoader()

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`)

    const data = response.json()

    toggleLoader()

    return data
}

const showMessageError = () => {
    errorMessage.classList.remove("hide")
}

const hideInformation = () => {
    errorMessage.classList.add("hide")
    container.classList.add("hide")
}

const showWeatherData = async (city) => {

    hideInformation()

    const data = await APIResponse(city)

    if(data.cod === "404"){
        showMessageError()
        return
    }

    cityName.innerHTML = data.name
    temperature.innerHTML = parseInt(data.main.temp)
    description.innerHTML = data.weather[0].description
    descriptionImage.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
    flag.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`)
    humidity.innerHTML = `${data.main.humidity}%`
    wind.innerHTML = `${data.wind.speed}Km/h`

    container.classList.remove("hide")
}

button.addEventListener("click", async(e) =>{
    e.preventDefault()
    showWeatherData(input.value)

    container.classList.add("hide")
})

input.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;
  
      showWeatherData(city);

      container.classList.add("hide")
    }
})



