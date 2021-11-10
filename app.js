const poke_container = document.getElementById('poke-container');
const pokemon_number = 3;
capitalize = (string) => { return string[0].toUpperCase() + string.slice(1) };

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i=1; i <= pokemon_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url =`https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

styleCard = (type) => {
  const color = colors[type];
  const front = document.querySelector(".flip_card_front");
  front.style.backgroundColor = color;
  const back = document.querySelector(".flip_card_back");
  back.style.backgroundColor = color;
};

createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div');
  const poke_types = pokemon.types.map(el => el.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);

  pokemonEl.classList.add('pokemon');

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const pokeInnerHTML =
  `
  <div class="flip_card">
    <div class="flip_card_inner">
      <div class="flip_card_front">
        <div class="image-container">
          <img src="${pokemon.sprites.other['official-artwork'].front_default}">
        </div>
        <div class="info">
          <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
          <h3 class="name">${name}</h3>
          <small class="type">Type: <span>${capitalize(type)}</span></small>
        </div>
      </div>
      <div class="flip_card_back"></div>
    </div>
  </div>
  `;
  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
  styleCard(type);
};

fetchPokemons();
getPokemon();
