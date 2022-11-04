import { loginBoton } from './componentes/botonLogin.js';
import { handleForm } from './componentes/formularioNewProduct.js';
import { selectHandler } from './componentes/formularioNewProduct.js';



document.addEventListener("DOMContentLoaded", () => {

  loginBoton();

  selectHandler();

  handleForm();


  let mensajeContent = document.querySelector("[data-mensaje-div]");
  let mensajeBanner = document.querySelector("[data-mensaje-span]");

  let msg = JSON.parse(window.sessionStorage.getItem("msg"));
  if (msg !== null) {
    msg.forEach(item => {
      mensajeContent.style.display = "flex";
      mensajeBanner.innerHTML += item;
    })

    let closeBanner = document.querySelector("#closeX");
    closeBanner.addEventListener("click", () => {
      window.sessionStorage.removeItem("msg");
      mensajeBanner.innerHTML = "";
      mensajeContent.style.display = "none";
    });
  }





  let userData = JSON.parse(window.sessionStorage.getItem("user"));

});
