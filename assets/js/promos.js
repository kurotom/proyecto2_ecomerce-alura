import { itemsPromos } from './componentes/showPromos.js';
import { loginBoton } from './componentes/botonLogin.js';
import { barraSearch } from './componentes/searchComponent.js';

document.addEventListener('DOMContentLoaded', () => {

  let conenedor = document.querySelector("#promos__body");

  itemsPromos(window.location.href, conenedor);

  barraSearch();

  loginBoton();

});
