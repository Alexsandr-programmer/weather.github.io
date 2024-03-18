const API_KEY = '08b64b3f059487907a8d18f7d59377e5'

const form = document.querySelector('#form')
const input = document.querySelector('.form__input')

form.onsubmit = submitHandler

async function submitHandler(e) {
	e.preventDefault()

	if (!input.value.trim()) {
		console.log('Enter city name')
		return
	}
	const cityInfo = await getGeo(input.value.trim())

	const weatherIfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon'])
	console.log(weatherIfo)

	const wetherData = {
		name: input.value.trim(),
		temp: weatherIfo.main.temp,
		humidity: weatherIfo.main.humidity,
		speed: weatherIfo.wind.speed,
		main: weatherIfo.weather[0]['main'],
	}

	renderWeatherData(wetherData)
}

async function getGeo(name) {
	const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`
	const response = await fetch(geoUrl)
	const data = await response.json()
	return data
}

async function getWeather(lat, lon) {
	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY} 
`
	const response = await fetch(weatherUrl)
	const data = await response.json()
	return data
}

function renderWeatherData(data) {
	const temp = document.querySelector('.weather__temp')
	const city = document.querySelector('.weather__city')
	const humidity = document.querySelector('#humidity')
	const speed = document.querySelector('#speed')
	const img = document.querySelector('.weather__img')

	temp.innerText = Math.round(data.temp) + '°c'
	city.innerText = data.name
	humidity.innerText = data.humidity + '%'
	speed.innerText = data.speed + 'km/h'

	const fileNames = {
		Clouds: 'clouds',
		Clear: 'clear',
		Rain: 'rain',
	}

	img.src = `./img/${fileNames[data.main]}.png`
}
