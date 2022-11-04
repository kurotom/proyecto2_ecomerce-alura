import { handleProductos } from './componentes/createContentItems.js';
import { loginBoton } from './componentes/botonLogin.js';


document.addEventListener('DOMContentLoaded', () => {

  let contenedorProductos = document.querySelector("#all__body");

  const btnAgregarProducto = document.getElementById("addBtn");

  let userData = JSON.parse(window.localStorage.getItem('user'));
  if (userData.isadmin === false || userData === null) {
    btnAgregarProducto.style.cssText = "display: none";


  } else {
    btnAgregarProducto.style.cssText = "display: flex";
  }



  loginBoton();
  handleProductos(contenedorProductos);



});
