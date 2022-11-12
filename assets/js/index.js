import { loginBoton } from './componentes/botonLogin.js';
import { showIndex } from './componentes/IndexShowContent.js';
import { barraSearch } from './componentes/searchComponent.js';
import { formContacto } from './componentes/contactoFormulario.js';

document.addEventListener('DOMContentLoaded', () => {


  barraSearch();

  loginBoton();

  showIndex();

  formContacto();

});
