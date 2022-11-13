import { loginBoton } from './componentes/botonLogin.js';
import { handleForm } from './componentes/formularioNewProduct.js';
import { selectHandler } from './componentes/formularioNewProduct.js';
import { formContacto } from './componentes/contactoFormulario.js';

document.addEventListener("DOMContentLoaded", () => {


  loginBoton();

  selectHandler();

  handleForm();

  formContacto();



});
