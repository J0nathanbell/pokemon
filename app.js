// index
const poke_container = document.getElementById("poke-container");
const pokemon_number = 40;
capitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ice: "#98d8d8",
  ghost: "#705898",
  dark: "#705848",
  steel: "#b8b8d0",
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const pokebits = [];
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemonRes = await fetch(pokemonUrl);
  const pokemon = await pokemonRes.json();
  const locationsRes = await fetch(pokemon.location_area_encounters);
  const locations = await locationsRes.json();
  pokebits.push(pokemon, locations);
  console.log(pokebits);
  createPokemonCard(pokemon, locations);
};

createPokemonCard = (pokemon, locations) => {
  // create the div
  const pokemonEl = document.createElement("div");
  // map the types into an array (poketypes)
  const poke_types = pokemon.types.map((el) => el.type.name);
  // find the single main type of the pokemon
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  // use that single main type to deturmin the background colour
  const color = colors[type];
  // style the cards
  pokemonEl.classList.add("pokemon");
  // capitalise the cards names
  const name = capitalize(pokemon.name);

  locationCreate = () => {
    array1 = [];
    spawncreate = locations.forEach((i) => array1.push(i.location_area.name));
    if (array1.length < 1) {
      array1.push("Does not spawn in the wild");
    }
    spawn_array = array1.slice(0, 1);
    const capitalise = spawn_array.map((spawn) => capitalize(spawn));
    spawn_list = capitalise.join(", ");
    return spawn_list.replace(/-/g, " ");
  };

  const pokeInnerHTML = `
  <div class="flip_card">
    <div class="flip_card_inner">
      <div class="flip_card_front" style="background-color:${color};">
        <div class="image-container">
          <img src="${pokemon.sprites.other["official-artwork"].front_default}">
        </div>
        <div class="info">
          <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
          <h3 class="name">${name}</h3>
          <small class="type"><span>${capitalize(type)}</span></small>
        </div>
      </div>
      <div class="flip_card_back" style="background-color:${color};">
        <div class="image-container">
          <img id="back-image" src="${
            pokemon.sprites.other.dream_world.front_default
          }">
        </div>
          <div class="info">
          <h3 class="height">Height: ${pokemon.height * 10}cm</h3>
          <h3 class="weight">Weight: ${pokemon.weight / 10}kg</h3>
          <small class="location"><strong>Spawn locations:</strong> ${locationCreate()}</small>

          </div>
      </div>
    </div>
  </div>
  `;
  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
getPokemon();
