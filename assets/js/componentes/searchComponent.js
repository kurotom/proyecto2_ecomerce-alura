import { fetchData } from '../handlers/fetch_get.js';
import { deleteData } from '../handlers/fetch_delete.js';
import { categoryURL, productosURL, usersURL} from '../urlsDB.js';

export const barraSearch = () => {

  let formulario = document.querySelector("[data-search]");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();


    let inputFormulario = document.querySelector("[data-search-input]");
    let consulta = inputFormulario.value;

    if (consulta !== "") {

      window.location.href = `search.html?q=${consulta}`

    }

  });

};


export const showSearchItems = (query) => {

  fetchData(productosURL).then(
    (response) => {

      let divParent = document.querySelector("[data-main-search]");
      let strongSearch = document.querySelector("[data-title-strong]")

      strongSearch.innerText = `${query}`;

      let coincidencias = response.filter(item => {
        return item.name.search(query) > -1
      });


      if (coincidencias.length === 0) {
        divParent.innerHTML = `<p id="nomatches">Sin coincidencias</p>`

      } else if (coincidencias.length > 0) {

        let userData = JSON.parse(window.localStorage.getItem("user"));
        let mostrarOpciones;
        if (userData !== null) {
          mostrarOpciones = userData.isadmin;
        }
        if (mostrarOpciones) {
          coincidencias.forEach(item => {
            let template =  `
              <div class="producto">
                <div class="producto__options" value="${item.id}">
                  <i id="edit" class="fa-solid fa-pen-to-square icons" title="Editar" ></i>
                  <i id="delete" class="fa-regular fa-trash-can icons" title="Borrar" ></i>
                </div>
                <div class="producto__informacion">
                  <img src="${item.img}" alt="productos">
                  <span>${item.name}</span>
                  <span>$ ${item.price}</span>
                  <a href="descripcion.html?item=${item.id}" title="Ir al producto">Ver producto</a>
                </div>
              </div>`;

            divParent.innerHTML += template;

          })
        } else {
          coincidencias.forEach(item => {
            let template =  `
              <div class="producto">
                <div class="producto__options" value="${item.id}">
                </div>
                <div class="producto__informacion">
                  <img src="${item.img}" alt="productos">
                  <span>${item.name}</span>
                  <span>$ ${item.price}</span>
                  <a href="descripcion.html?item=${item.id}" title="Ir al producto">Ver producto</a>
                </div>
              </div>`;

            divParent.innerHTML += template;

          })
        }



        let editarBtn = document.querySelectorAll("#edit");
        let borrarBtn = document.querySelectorAll("#delete");


        editarBtn.forEach(item => {
          item.addEventListener('click', () => {
            const itemID = item.parentNode.getAttribute("value");
            window.location.href = `editproduct.html?id=${itemID}`;
          })
        });
        borrarBtn.forEach(item => {
          item.addEventListener("click", () => {
            const itemID = item.parentNode.getAttribute("value");
            deleteData(productosURL + `/${itemID}`, {"id": itemID}).then(
              (response) => {

                let content = document.querySelector("[data-msg-span]");
                content.innerHTML += `<span>Elemento borrado</span>`;
                document.querySelector("[data-msg]").style.display = "flex";


              },
              (error) => {
              }
            )
            // handleProductos();
          })
        });

      }



    },
    (error) => {

    }
  );


};
