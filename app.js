const fetchyGuy = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  .then(response => response.json())
  .then(data => console.log(data));
const wrapper = document.querySelector('.wrapper'),
      form    = wrapper.querySelectorAll('.form'),
      submitInput = form[0].querySelector('input[type = "submit"]');
function getDataForm(e){
  e.preventDefault();
  const formData = new FormData(form[0]);
}
