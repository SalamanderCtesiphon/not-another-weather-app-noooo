const selectionBtn = document.getElementById('selection-btn')


selectionBtn.addEventListener('click', (e) => {
  e.preventDefault()
  getWeather().catch(function(err) {
    console.log(err)
  })
})

async function getWeather() {
  let selection = document.getElementById('selection').value
  const response = await 
    fetch(`https://api.weatherapi.com/v1/current.json?key=6198ff01fbf84dfbbac171056230305&q=${selection}`,
      { mode: 'cors'});
  const movies = await response.json();
  console.log(movies);
  return movies
}
