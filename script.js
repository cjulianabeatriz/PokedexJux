const pokemonName = document.querySelectorAll('.titulo-card');
const pokemonImage = document.querySelectorAll('.img-pokemon');
const pokemonNumber = document.querySelectorAll('.numero-card');
const pokemonTipo = document.querySelector('.tipo');
const pokemonAtaque = document.querySelectorAll('.attack');
const pokemonDefesa = document.querySelectorAll('.defense');
const openModalButton = document.querySelector('#btn-grass');
const closeModalButton = document.querySelector('#close-modal');
const modal = document.querySelector ('#modal');
const fade = document.querySelector ('#fade');
const form = document.querySelector('.campo');
const input = document.querySelector('.pesquisa');

const pokemonId = 0;

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});

const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    const data = await APIresponse.json();
    return data;
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    pokemonName.forEach((item) => {
        item.innerHTML = data.name;
    });
    pokemonNumber.forEach((item) => {
        item.innerHTML = data.id;
    });
    pokemonImage.forEach((item) => {
        item.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    });
    pokemonTipo.innerHTML = data['types']['0']['type']['name'];

    pokemonAtaque.forEach ((item) => {
        item.innerHTML = data['stats']['1']['base_stat'];
    })
    pokemonDefesa.forEach ((item) => {
        item.innerHTML = data['stats']['3']['base_stat'];
    })
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
    input.value = '';
})