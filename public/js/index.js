const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationS = document.querySelector('#location')
const forecast = document.querySelector('#forecast')


const elem = document.createElement("img");




weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  console.log(location)
  locationS.textContent = 'Loading...'
  forecast.textContent = ''
  fetch(`weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.error) {
        locationS.textContent = `${data.message}`
      } else {
        elem.src = `${data.forecastData.icon}`
        document.getElementById("icon").appendChild(elem);
        locationS.textContent = `${data.forecastData.description}. It is currently ${data.forecastData.temp} degrees but it feels like ${data.forecastData.feels} degrees.`
      }
    })
})