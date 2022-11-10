import { barraSearch } from './componentes/searchComponent.js';
import { showSearchItems } from './componentes/searchComponent.js';
import { loginBoton } from './componentes/botonLogin.js';




document.addEventListener("DOMContentLoaded", () => {

  loginBoton();

  barraSearch();


  let url = new URL(window.location.href);
  let consulta = url.search.split("?q=")[1];

  showSearchItems(consulta);




});
