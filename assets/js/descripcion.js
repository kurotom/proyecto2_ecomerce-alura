import { showDescripcion } from './componentes/showContentDescription.js';
import { barraSearch } from './componentes/searchComponent.js';


document.addEventListener("DOMContentLoaded", () => {


  let urlSearch = new URL(window.location.href);

  let itemID = urlSearch.search.split("?item=")[1]

  showDescripcion(itemID);

  barraSearch();

})
