import { barraSearch } from './componentes/searchComponent.js';

import { fetchData } from './handlers/fetch_get.js';
import { postData } from './handlers/fetch_post.js';

import { putData } from './handlers/fetch_put.js';
import { deleteData } from './handlers/fetch_delete.js';




document.addEventListener("DOMContentLoaded", () => {

  barraSearch();

  let changePanel = document.querySelector("[data-change]");
  let cancelChangePass = document.querySelector("[data-create-cancel]");

  // div alertas formulario
  let contenedorMSG = document.querySelector("[data-msg]");
  let spanMSG = document.querySelector("[data-msg-span]");
  let btnCloseMSG = document.querySelector("[data-msg-close]");
  //


  //  panel control usuario
  let panelUser = document.querySelector("[data-panel]");
  let panelH1 = document.querySelector("[data-panel-h1]");
  let panelUsername = document.querySelector("[data-panel-nombre]");
  let panelEmail = document.querySelector("[data-panel-email]");
  let panelQuit = document.querySelector("[data-panel-quit]");
  let changePass = document.querySelector("[data-panel-change-pass]");
  //

  //
  // change password
  let formularioChangePassword = document.querySelector("[data-form-change-pass]");
  // let oldPass = document.querySelector("[data-form-change-old]");
  let newPass1 = document.querySelector("[data-form-change-new1]");
  let newPass2 = document.querySelector("[data-form-change-new2]");
  let formularioSubmitBtn = document.querySelector("[data-form-btnSubmit]");
  //
  //

  //
  // DELETE ACCOUNT
  let ventanaDeleteAlert = document.querySelector("[data-delete-account]");
  let deleteMyAccount = document.querySelector("[data-panel-delete-account]");
  deleteMyAccount.addEventListener("click", () => {
    panelUser.style.display = "none";
    ventanaDeleteAlert.style.display = "flex";
  });


  const confirmDeleteAccount = document.querySelector("[data-confirm-delete]");
  const cancelDeleteAccount = document.querySelector("[data-cancel-delete]");
  confirmDeleteAccount.addEventListener("click", () => {
    deleteData(`http://localhost:8000/users/${userData.id}`, {"id": userData.id}).then(
      (response) => {
        window.localStorage.removeItem("user");
        window.location.href = "/";
      },
      (error) => {
      }
    )
  });
  cancelDeleteAccount.addEventListener("click", () => {
    panelUser.style.display = "flex";
    ventanaDeleteAlert.style.display = "none";
  });

  //
  //

  //
  // HANDLE ACCOUNT SHOW OR SHOW LOGIN/REGISTER
  let userData = JSON.parse(window.localStorage.getItem("user"));
  if (userData !== null && Object.keys(userData).length > 0) {

    panelH1.innerText = userData.name.slice(0, 1).toUpperCase() + userData.name.slice(1,);
    panelUsername.innerText = userData.name;
    panelEmail.innerText = userData.email;


    //  HANDLE BOTON QUIT
    panelQuit.addEventListener('click', () => {
      window.localStorage.setItem("user", JSON.stringify({}));
      window.location.href = "login.html";
    })


    // HANDLE BOTON EDIT
    let edit = document.querySelectorAll("#edit");
    edit.forEach(item => {
      item.addEventListener("click", () => {
        window.location.href = `useredit.html?id=${userData.id}`
      });
    });
  };

  changePass.addEventListener("click", () => {
    panelUser.style.display = "none";
    changePanel.style.display = "flex";



  });
  cancelChangePass.addEventListener("click", () => {
    panelUser.style.display = "flex";
    changePanel.style.display = "none";
  })

  //
  //
  // handle formulario change password
  formularioChangePassword.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (newPass1.value === newPass2.value) {

      let userData = JSON.parse(window.localStorage.getItem("user"));
      userData.pass = newPass1.value;

      putData(`http://localhost:8000/users/${userData.id}`, userData).then(
        (response) => {
          panelUser.style.display = "flex";
          changePanel.style.display = "none";

          contenedorMSG.style.display = "flex";
          spanMSG.innerHTML = `<p>Datos actualizados</p>`;
        },
        (error) => {
        }
      )

    } else {
      contenedorMSG.style.display = "flex";
      spanMSG.innerHTML = `<p>algo</p>`;

      setTimeout(() => {
        contenedorMSG.style.display = "none";
        spanMSG.innerHTML = '';
      }, 3000);

    }
  });

  btnCloseMSG.addEventListener('click', () => {
    contenedorMSG.style.display = 'none';
    spanMSG.innerText = "";

  });



});
