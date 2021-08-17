const pokemonlist = document.getElementById('pokemonlist');

const getPokemon = () => {
  const promises = [];

  for (let i = 1; i <= 100; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(res => res.json()));
  }

  Promise.all(promises).then(result => {
    const pokemon = result.map(data => ({
      id: data.id,
      name: data.name,
      image: data.sprites['front_default'],
      height: data.height,
      weight: data.weight,
      imageB: data.sprites.back_default,
      abilities: data.abilities,
      types: data.types,
    }));
    console.log(pokemon);
    displayPokemon(pokemon);
  });
};

const displayPokemon = pokemon => {
  const pokemonString = pokemon
    .map(
      singlePokemon => `
    <li>
      <img src="${singlePokemon.image}" />
      <h3>${singlePokemon.id}. ${singlePokemon.name.toUpperCase()}</h3>
      
      <h4>Abilities : ${singlePokemon.abilities[0].ability.name}</h4>
      <h4>Hight : ${singlePokemon.height}  Weight : ${singlePokemon.weight}</h4>
    </li>`
    )
    .join('');

  pokemonlist.innerHTML = pokemonString;
};

getPokemon();

function filterdata() {
  let input, filter;
  input = document.getElementById('InputText');
  filter = input.value.toUpperCase();
  let names = document.getElementsByTagName('h3');
  let li = document.getElementsByTagName('li');

  for (let i = 0; i < names.length; i++) {
    let txtValue = names[i].innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
