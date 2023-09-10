const selectionBtn = document.getElementById('selection-btn')


selectionBtn.addEventListener('click', (e, movies) => {
  e.preventDefault()
  const form = document.getElementById('form')
  form.style.display = 'none'
  getWeather()
  .then(
    (movies) => {
      const display = document.querySelector('.display')
      display.style.display = 'flex'
      const locationName = document.querySelector('.locationName')
      const cardBody = document.querySelector('.cardBody')
      const mainImage = document.createElement('img')
      const title = document.createElement('h1')
      const temp = document.createElement('h1')
      const location = document.createElement('p')
      const forcastDisplay = document.querySelector('.forcastDisplay')
      forcastDisplay.style.display = 'flex'
      location.textContent = `${movies.location.name}`
      temp.textContent = `${movies.current.temp_f} F`
      if(movies.current.condition.text === "Sunny") {
        mainImage.src = '/icons/sunny.png'
      }
      title.textContent = movies.current.condition.text
      const cardBodyBox = document.createElement('div')
      cardBodyBox.style.textAlign = 'center'
      locationName.appendChild(location)
      cardBody.appendChild(mainImage)
     
      cardBodyBox.appendChild(title)
      cardBodyBox.appendChild(temp)
      cardBody.appendChild(cardBodyBox)
      display.appendChild(cardBody)
      
    }
  )
  .catch(function(err) {
    console.log(err)
  })
})

async function getWeather() {
  let selection = document.getElementById('selection').value
  const response = await 
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=6198ff01fbf84dfbbac171056230305&q=${selection}&days=3`,
      { mode: 'cors'});
  const movies = await response.json();
  console.log(movies);
  return movies
}


