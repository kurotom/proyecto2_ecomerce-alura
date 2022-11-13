import { categoryURL, productosURL, usersURL} from './urlsDB.js';

import { fetchData } from './handlers/fetch_get.js';
import { postData } from './handlers/fetch_post.js';

import { barraSearch } from './componentes/searchComponent.js';

import { formContacto } from './componentes/contactoFormulario.js';



document.addEventListener('DOMContentLoaded', () => {

  // div alertas formulario
  let contenedorMSG = document.querySelector("[data-msg]");
  let spanMSG = document.querySelector("[data-msg-span]");
  let btnCloseMSG = document.querySelector("[data-msg-close]");
  //

  // formulario login
  const loginDiv = document.querySelector("[data-login]");
  const formularioLogin = document.querySelector("[data-form]");
  let email = document.querySelector("[data-form-email]");
  let password = document.querySelector("[data-form-password]");
  let btnCreateAccount = document.querySelector("[data-create-span]");
  //


  // formulario crear cuenta
  let conenedorCreate = document.querySelector("[data-contenedor-create]");

  let formularioCreate = document.querySelector("[data-register-form]");
  let nameNewUser = document.querySelector("[data-register-name]");
  let emailNewUser = document.querySelector("[data-register-email]");
  let pass1NewUser = document.querySelector("[data-register-pass1]");
  let pass2NewUser = document.querySelector("[data-register-pass2]");
  let btnSubmitCreate = document.querySelector("[data-register-btnSubmit]");

  let cancelCreateUser = document.querySelector("[data-create-cancel]");
  //


  //
  barraSearch();
  //
  formContacto();
  //


//
// BUTTONS HANDLE CREATE-CANCEL CREATE NEW ACCOUNT
  btnCreateAccount.addEventListener("click", (evento) => {
    conenedorCreate.style.display = "flex";
    loginDiv.style.display = "none";
  })
  cancelCreateUser.addEventListener("click", () => {
    conenedorCreate.style.display = "none";
    loginDiv.style.display = "flex";

    contenedorMSG.style.display = 'none';
    spanMSG.innerText = "";
  })
//
//



//
//  Formulario CREATE ACCOUNT
  formularioCreate.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let divMensajes = document.querySelector("[data-msg-span]");

    if (pass1NewUser.value === pass2NewUser.value) {
      let objeto = {
        "id": uuid.v4(),
        "name": nameNewUser.value,
        "pass": pass1NewUser.value,
        "email": emailNewUser.value,
        "isadmin": false
      }
      postData(usersURL, objeto).then(
        (response) => {
          // console.log(response)

          const dataUser = {
            "id": objeto.id,
            "name": objeto.name,
            "email": objeto.email,
            "isadmin": objeto.isadmin
          }
          window.localStorage.setItem("user", JSON.stringify(dataUser));

          nameNewUser.value = "";
          emailNewUser.value = "";
          pass1NewUser.value = "";
          pass2NewUser.value = "";

          window.location.href = "index.html";
        },
        (error) => {
        }
      )

    } else {
      divMensajes.innerHTML = "";
      divMensajes.innerHTML = `<span>Las contraseñas deben coincidir</span>`;
      contenedorMSG.style.display = "flex";


      pass1NewUser.value = "";
      pass2NewUser.value = "";
    }

  });



//
//  Formulario LOGIN ACCOUNT
  formularioLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    contenedorMSG.style.display = 'none';
    spanMSG.innerText = "";

    // a = "email@test.co"
    // re = /\w+@\w+\.\w{2,3}/gm
    // a.match(re)


    if (email.value.length > 0 || password.value.length > 0) {

      fetchData(usersURL).then(
        (response) => {

          const usuario = response.filter(item => {
            return item.email === email.value
          })

          if (usuario.length === 0) {
            spanMSG.innerText = "Usuario/Contraseña incorrectos"
            contenedorMSG.style.display = "flex";

            email.value = "";
            password.value = "";

          } else {

            if (usuario[0].pass === password.value) {

              email.value = "";
              password.value = "";

              const dataUser = {
                "id": usuario[0].id,
                "name": usuario[0].name,
                "isadmin": usuario[0].isadmin,
                "email": usuario[0].email
              }

              window.localStorage.setItem("user", JSON.stringify(dataUser));

              window.location.href = "panel.html";


            } else {
              spanMSG.innerText = "Usuario/Contraseña incorrectos"
              contenedorMSG.style.display = "flex";

              email.value = "";
              password.value = "";
            }

          }
        },
        (error) => {
          console.log(error)
        }
      )

    } else {
      spanMSG.innerText = "Debe ingresar datos."
      contenedorMSG.style.display = "flex";
    }

  });


  btnCloseMSG.addEventListener('click', () => {
    contenedorMSG.style.display = 'none';
    spanMSG.innerText = "";
  });

});
