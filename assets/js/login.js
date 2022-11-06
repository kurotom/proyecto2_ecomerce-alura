import { fetchData } from './handlers/fetch_get.js';


document.addEventListener('DOMContentLoaded', () => {

  // div alertas formulario
  let contenedorMSG = document.querySelector("[data-msg]");
  let spanMSG = document.querySelector("[data-msg-span]");
  let btnCloseMSG = document.querySelector("[data-msg-close]");
  //

  // formulario login
  const loginDiv = document.querySelector("[data-login]");
  const formulario = document.querySelector("[data-form]");
  let email = document.querySelector("[data-form-email]");
  let password = document.querySelector("[data-form-password]");
  //

  //  panel control usuario
  let panelUser = document.querySelector("[data-panel]");
  let panelUsername = document.querySelector("[data-panel-name]");
  let panelEmail = document.querySelector("[data-panel-email]");
  let panelQuit = document.querySelector("[data-panel-quit]");
  //

  // formulario crear cuenta
  let conenedorCreate = document.querySelector("[data-contenedor-create]");
  let formularioCreate = document.querySelector("[data-register-form]");
  let nameNewUser = document.querySelector("[data-register-name]");
  let emialNewUser = document.querySelector("[data-register-email]");
  let pass1NewUser = document.querySelector("[data-register-pass1]");
  let pass2NewUser = document.querySelector("[data-register-pass2]");
  let btnSubmitCreate = document.querySelector("[data-register-btnSubmit]");
  let btnCreateAccount = document.querySelector("[data-create-span]");
  let cancelCreateUser = document.querySelector("[data-create-cancel]");
  //

  cancelCreateUser.addEventListener("click", () => {
    conenedorCreate.style.display = "none";
    loginDiv.style.display = "flex";
    panelUser.style.display = "none";
  })

  btnCreateAccount.addEventListener("click", (evento) => {
    conenedorCreate.style.display = "flex";
    loginDiv.style.display = "none";
    panelUser.style.display = "none";
  })


  let userData = JSON.parse(window.localStorage.getItem("user"));
  if (userData !== null && Object.keys(userData).length > 0) {
    conenedorCreate.style.display = "none";
    loginDiv.style.display = "none";
    panelUser.style.display = "flex";

    panelUsername.innerText = userData.name.slice(0, 1).toUpperCase() + userData.name.slice(1,);
    panelEmail.innerText = userData.email;


    panelQuit.addEventListener('click', () => {
      window.localStorage.setItem("user", JSON.stringify({}));

      conenedorCreate.style.display = "none";
      loginDiv.style.display = "flex";
      panelUser.style.display = "none";
    })
  };


  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    contenedorMSG.style.display = 'none';
    spanMSG.innerText = "";

    if (email.value.length > 0 || password.value.length > 0) {

      fetchData('http://localhost:8000/users').then(
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
              console.log("logueado");

              email.value = "";
              password.value = "";

              const dataUser = {
                "name": usuario[0].name,
                "isadmin": usuario[0].isadmin,
                "email": usuario[0].email
              }

              window.localStorage.setItem("user", JSON.stringify(dataUser));

              window.location.href = "/";


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

  })


  btnCloseMSG.addEventListener('click', () => {
    contenedorMSG.style.display = 'none';
    spanMSG.innerText = "";
  })







})
