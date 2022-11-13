import { showDescripcion } from './componentes/showContentDescription.js';
import { barraSearch } from './componentes/searchComponent.js';
import { formContacto } from './componentes/contactoFormulario.js';


document.addEventListener("DOMContentLoaded", () => {

  formContacto();

  let urlSearch = new URL(window.location.href);

  let itemID = urlSearch.search.split("?item=")[1]

  showDescripcion(itemID);

  barraSearch();

})
