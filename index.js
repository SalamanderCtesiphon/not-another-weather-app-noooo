const selectionBtn = document.getElementById('selection-btn')


selectionBtn.addEventListener('click', (e, movies) => {
  e.preventDefault()
  getWeather()
  .then(
    (movies) => {
      const display = document.querySelector('.display')
      const mainImage = document.createElement('img')
      const title = document.createElement('h1')
      const temp = document.createElement('h1')
      const location = document.createElement('p')
      location.textContent = movies.location.name
      temp.textContent = `${movies.current.temp_f} `
      title.textContent = movies.current.condition.text
      mainImage.src = movies.current.condition.icon
      display.appendChild(location)
      display.appendChild(mainImage)
     
      display.appendChild(title)
      display.appendChild(temp)
      
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


