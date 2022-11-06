import { loginBoton } from './componentes/botonLogin.js';
import { showIndex } from './componentes/IndexShowContent.js';
import { barraSearch } from './componentes/searchComponent.js';

document.addEventListener('DOMContentLoaded', () => {


  barraSearch();

  loginBoton();

  showIndex();


});
