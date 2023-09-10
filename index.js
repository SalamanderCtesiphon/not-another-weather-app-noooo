console.log('hi')

async function getWeather() {
  const response = await 
    fetch(`https://api.weatherapi.com/v1/current.json?key=11111111111111111&q=${location}`);
  const movies = await response.json();
  console.log(movies);
}
