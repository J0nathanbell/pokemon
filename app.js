const results = document.querySelector('#results');
const apiUrl = "https://pokeapi.co/api/v2/pokemon/pikachu"
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const name = `<h2>${data.name}</h2>`
    const id      = `<h2>${data.id}</h2>`
    const picture = `<img src="${data.sprites.other['official-artwork'].front_default}" />`
    results.insertAdjacentHTML('beforeend', name)
    results.insertAdjacentHTML('beforeend', id)
    results.insertAdjacentHTML('beforeend', picture)

  });




  // .then(response => response.json())
  // .then(data => console.log(data));

  // const name = data.name
  // const id = data.id
  // const image = data.sprites.official-artwork.front_default
