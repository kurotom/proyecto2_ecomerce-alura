import { categoryURL, productosURL, usersURL} from './urlsDB.js';
import { patchData } from './handlers/fetch_patch.js';
import { formContacto } from './componentes/contactoFormulario.js';

document.addEventListener("DOMContentLoaded", () => {

  formContacto();

  let userData = JSON.parse(window.localStorage.getItem("user"));

  let divContent = document.querySelector("[data-content]");

  let formChange = document.createElement("form");
  formChange.setAttribute("id", "form__change");
  formChange.setAttribute("data-form", "");

  divContent.appendChild(formChange);

  formChange.innerHTML += `<fieldset><span>Nombre</span><input class="input__edit" type="text" name="" value="" min="1" placeholder="${userData.name}" data-content-name></fieldset>`;
  formChange.innerHTML += `<fieldset><span>Email</span><input class="input__edit" type="email" name="" value="" min="1" placeholder="${userData.email}" data-content-email></fieldset>`;
  formChange.innerHTML += `<div class="div-span-form" ><button class="button__submit" type="submit" name="button" data-register-btnSubmit>Enviar</button></div>`;

  divContent.innerHTML += `<div class="div-span-form" ><span data-create-cancel>Cancelar</span></div>`;

  //
  // formulario creado mediante JSX
  let formDataChange = document.querySelector("[data-form]");
  let nameInput = document.querySelector("[data-content-name]");
  let emailInput = document.querySelector("[data-content-email]");
  let cancelEdit = document.querySelector("[data-create-cancel]");
  let deleteAccount = document.querySelector("[panel__delete-account]");


  formDataChange.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (nameInput.value !== "" || emailInput.value !== "") {
      // userData
      if (nameInput.value !== "") {
        userData.name = nameInput.value;
      }
      if (emailInput.value !== "") {
        userData.email = emailInput.value;
      }


      window.localStorage.removeItem("user");
      window.localStorage.setItem("user", JSON.stringify(userData));


      patchData(usersURL + `/${userData.id}`, userData).then(
        (response) => {
          window.location.href = "panel.html";
        },
        (error) => {
        }
      )

    } else {
      window.location.href = "panel.html";
    }

  });

  cancelEdit.addEventListener("click",() => {
    window.location.href = "panel.html";
  });
  deleteAccount.addEventListener("click", () => {

  });

});
