import { categoryURL, productosURL, usersURL} from './urlsDB.js';

import { loginBoton } from './componentes/botonLogin.js';
import { selectEditCategoria } from './componentes/formularioNewProduct.js';

import { fetchData } from './handlers/fetch_get.js';
import { putData } from './handlers/fetch_put.js';


document.addEventListener("DOMContentLoaded", () => {


  loginBoton();

  selectEditCategoria();

  let cancel = document.querySelector("[data-create-cancel]");
  cancel.addEventListener("click", () => {
    window.history.back();
  });


  let url = new URL(window.location.href);
  let idProducto = url.search.split('?id=')[1];


  fetchData(productosURL).then(
    (response) => {
      let itemArray = response.filter(item => {
        return item.id.toString() === idProducto.toString();
      })
      if (itemArray.length >= 1) {
        let item = itemArray[0];

        let formEdit = document.querySelector("[data-form-new]");
        let urlImg = document.querySelector("[data-form-url]");
        let selectCategory = document.querySelector("[data-form-category-select]");
        let nameItem = document.querySelector("[data-form-nombre]");
        let priceItem = document.querySelector("[data-form-precio]");
        let descriptionItem = document.querySelector("[data-form-descripcion]");

        selectCategory.setAttribute("value", item.cat);
        selectCategory.value = `${item.cat}`;

        urlImg.setAttribute("placeholder", `${item.img}`);
        nameItem.setAttribute("placeholder", `${item.name}`);
        descriptionItem.setAttribute("placeholder", `${item.desc}`);
        priceItem.setAttribute("placeholder", `${item.price}`);



        formEdit.addEventListener("submit", (evento) => {
          evento.preventDefault();

          let objetoNuevo = {};

          if (parseInt(selectCategory.value) !== parseInt(item.cat)) {
            objetoNuevo = {
              "cat": parseInt(selectCategory.value),
            }

            if (urlImg.value !== "") {
              objetoNuevo.img = urlImg.value;
            } else {
              objetoNuevo.img = item.img;
            }
            if (nameItem.value !== "") {
              objetoNuevo.name = nameItem.value;
            } else {
              objetoNuevo.name = item.name;
            }

            if (descriptionItem.value !== "") {
              objetoNuevo.desc = descriptionItem.value;
            } else {
              objetoNuevo.desc = item.desc;
            }
            if (priceItem.value !== "") {
              objetoNuevo.price = priceItem.value;
            } else {
              objetoNuevo.price = item.price;
            }

          } else {
            objetoNuevo = {
              "cat": parseInt(selectCategory.value),
            }

            if (urlImg.value !== "") {
              objetoNuevo.img = urlImg.value;
            } else {
              objetoNuevo.img = item.img;
            }
            if (nameItem.value !== "") {
              objetoNuevo.name = nameItem.value;
            } else {
              objetoNuevo.name = item.name;
            }

            if (descriptionItem.value !== "") {
              objetoNuevo.desc = descriptionItem.value;
            } else {
              objetoNuevo.desc = item.desc;
            }
            if (priceItem.value !== "") {
              objetoNuevo.price = priceItem.value;
            } else {
              objetoNuevo.price = item.price;
            }

          }

          putData(productosURL + `/${item.id}`, objetoNuevo).then(
            (response) => {

              window.history.back();

            },
            (error) => {
            }
          )
        });
      };
    },
    (error) => {
    }
  );

});
