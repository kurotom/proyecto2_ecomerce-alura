import { barraSearch } from './componentes/searchComponent.js';
import { showSearchItems } from './componentes/searchComponent.js';



document.addEventListener("DOMContentLoaded", () => {

  barraSearch();


  let url = new URL(window.location.href);
  let consulta = url.search.split("?q=")[1];

  showSearchItems(consulta);



});
