const selectionBtn = document.getElementById('selection-btn')

selectionBtn.addEventListener('click', (e) => {
  e.preventDefault()
  getWeather()
})





async function getWeather() {
  let selection = document.getElementById('selection').value
  const response = await 
    fetch(`https://api.weatherapi.com/v1/current.json?key=6198ff01fbf84dfbbac171056230305&q=${selection}`, { mode: 'cors'});
  const movies = await response.json();
  console.log(movies);
}





/* (e) => {
  e.preventDefault()
  const selection = document.getElementById('selection').value

  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=FKHrnl8qaMWyeJf85XwRk8AKF6GmD3Zr&s=${selection}`, {
  mode: 'cors'
})
  .then(function(response) {
    return response.json()
  })
  .then(function(response) {
    img.src = response.data.images.original.url
  })
  .catch(function(err) {
    console.log(err)
  })
} */