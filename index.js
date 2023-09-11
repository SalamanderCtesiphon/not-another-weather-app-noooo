const selectionBtn = document.getElementById('selection-btn')

const currentYear = document.querySelector('.year');
currentYear.textContent = new Date().getFullYear();

var fahrenheit = true

selectionBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const form = document.getElementById('form')
  form.style.display = 'none'

  getWeather()
  .then(
    (movies) => {
      renderScreen(movies)
  }).catch(function(err) {
    console.log(err)
  })
})

function renderScreen(movies) {
  console.log(movies.current.is_day)

  if(movies.current.is_day === 0) {
    const background = document.getElementById('body')
    background.style.background = 'black'
  }

 
  
  const display = document.querySelector('.display')
  display.style.display = 'flex'
  const locationName = document.querySelector('.locationName')
  const cardBody = document.querySelector('.cardBody')
  const mainImage = document.createElement('img')
  const title = document.createElement('h1')
  title.setAttribute('class', 'titleName')
  const temp = document.createElement('h1')
  temp.setAttribute('class', 'currentTemp')
  const tempBtn = document.createElement('button')
  tempBtn.textContent = 'change units'
  tempBtn.setAttribute('class', 'button')

  tempBtn.addEventListener('click', (e) => {
    fahrenheit = !fahrenheit
    rerenderTemps(movies)
  })

  const location = document.createElement('p')
  const dateTime = document.querySelector('.dateTime')
  dateTime.textContent = movies.location.localtime
  
  location.textContent = `${movies.location.name}`
  temp.textContent = `${movies.current.temp_f} F`
  if(movies.current.condition.text === "Sunny") {
    mainImage.src = '/icons/sunny.png'
  } else {
    mainImage.src = movies.current.condition.icon
    mainImage.style.height = '80px'
  }

  title.textContent = movies.current.condition.text
  const cardBodyBox = document.createElement('div')
  cardBodyBox.style.textAlign = 'center'

  const forcastDisplay = document.querySelector('.forcastDisplay')
  forcastDisplay.style.display = 'flex'

  const hiTemp = document.getElementById('hiTemp')
  hiTemp.textContent = movies.forecast.forecastday[0].day.maxtemp_f
  const lowTemp = document.getElementById('lowTemp')
  lowTemp.textContent = movies.forecast.forecastday[0].day.mintemp_f
  const sunUp = document.getElementById('sunup')
  sunUp.textContent = movies.forecast.forecastday[0].astro.sunrise
  const sunDown = document.getElementById('sundown')
  sunDown.textContent = movies.forecast.forecastday[0].astro.sunset

  const nextDayImg = document.querySelector('.ndImage')
  const ndTemp = document.querySelector('.ndTemp')
  ndTemp.textContent = movies.forecast.forecastday[1].day.maxtemp_f
  const ndimg = document.createElement('img')
  ndimg.src = movies.forecast.forecastday[1].day.condition.icon
  ndimg.style.height = '60px'
  
  nextDayImg.appendChild(ndimg)
  const ndText = document.querySelector('.ndText')
  ndText.textContent = movies.forecast.forecastday[1].day.condition.text

  const dayAfterImg = document.querySelector('.daImage')
  const daTemp = document.querySelector('.daTemp')
  daTemp.textContent = movies.forecast.forecastday[2].day.maxtemp_f
  const daimg = document.createElement('img')
  daimg.src = movies.forecast.forecastday[2].day.condition.icon
  daimg.style.height = '60px'
  
  dayAfterImg.appendChild(daimg)
  const daText = document.querySelector('.daText')
  daText.textContent = movies.forecast.forecastday[2].day.condition.text

  locationName.appendChild(location)
  cardBody.appendChild(mainImage)
  cardBodyBox.appendChild(title)
  cardBodyBox.appendChild(temp)
  cardBody.appendChild(cardBodyBox)
  cardBody.appendChild(tempBtn)
  display.appendChild(cardBody) 
}

function rerenderTemps(movies) {
  if(fahrenheit === false) {
    const currentTemp = document.querySelector('.currentTemp')
    currentTemp.textContent = `${movies.current.temp_c} C`
    const hiTemp = document.getElementById('hiTemp')
    hiTemp.textContent = movies.forecast.forecastday[0].day.maxtemp_c
    const lowTemp = document.getElementById('lowTemp')
    lowTemp.textContent = movies.forecast.forecastday[0].day.mintemp_c
    const ndTemp = document.querySelector('.ndTemp')
    ndTemp.textContent = movies.forecast.forecastday[1].day.maxtemp_c
    const daTemp = document.querySelector('.daTemp')
    daTemp.textContent = movies.forecast.forecastday[2].day.maxtemp_c
  } else {
    const currentTemp = document.querySelector('.currentTemp')
    currentTemp.textContent = `${movies.current.temp_f} F`
    const hiTemp = document.getElementById('hiTemp')
    hiTemp.textContent = movies.forecast.forecastday[0].day.maxtemp_f
    const lowTemp = document.getElementById('lowTemp')
    lowTemp.textContent = movies.forecast.forecastday[0].day.mintemp_f
    const ndTemp = document.querySelector('.ndTemp')
    ndTemp.textContent = movies.forecast.forecastday[1].day.maxtemp_f
    const daTemp = document.querySelector('.daTemp')
    daTemp.textContent = movies.forecast.forecastday[2].day.maxtemp_f
  }
}

async function getWeather() {
  let selection = document.getElementById('selection').value
  if(selection === '') {
    alert('please enter a valid city or zip code')
    location.reload()
  } else {
    const response = await 
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=6198ff01fbf84dfbbac171056230305&q=${selection}&days=3`,
      { mode: 'cors'});
    const movies = await response.json();
    console.log(movies);
    return movies
  }
  
}

const locationSpan = document.getElementById('locationSpan')

locationSpan.addEventListener('click', (e) => {
  e.preventDefault()
  location.reload()
})


