import { categoryURL, productosURL, usersURL, descuentoURL} from '../urlsDB.js';
import { fetchData } from '../handlers/fetch_get.js';
import { deleteData } from '../handlers/fetch_delete.js';

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

  const consultaQuery = query;

  fetchData(productosURL).then(
    (response) => {

      let searchProductos = response;

      let divParent = document.querySelector("[data-main-search]");
      let strongSearch = document.querySelector("[data-title-strong]")

      strongSearch.innerText = `${query}`;

      let coincidencias = searchProductos.filter(item => {
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


        fetchData(descuentoURL).then(
          (response) => {
            let categoriaDescuento = response;

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
                      <span class="producto__info-name">${item.name}</span>
                      ${
                        parseInt(categoriaDescuento[0].catid) === parseInt(item.cat)
                        ? `<div>
                          <span class="producto__info-precio-original">$ ${item.price}</span>
                          <span class="producto__info-precio-descuento">$ ${ (item.price - ((response[0].desc * item.price) / 100)).toFixed(1) }</span>
                        </div>
                        `
                        : `<span class="producto__info-precio">$ ${item.price}</span>`
                      }
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
                      <span class="producto__info-name">${item.name}</span>
                      ${
                        parseInt(categoriaDescuento[0].catid) === parseInt(item.cat)
                        ? `<div>
                          <span class="producto__info-precio-original">$ ${item.price}</span>
                          <span class="producto__info-precio-descuento">$ ${ (item.price - ((response[0].desc * item.price) / 100)).toFixed(1) }</span>
                        </div>
                        `
                        : `<span class="producto__info-precio">$ ${item.price}</span>`
                      }
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

                    // let content = document.querySelector("[data-msg-span]");
                    // content.innerHTML = `<span>Elemento borrado</span>`;
                    // document.querySelector("[data-msg]").style.display = "flex";
                    //
                    // setTimeout(() => {
                    //   content.innerHTML = "";
                    //   document.querySelector("[data-msg]").style.display = "none";
                    // }, 2500);


                    document.querySelector("[data-main-search]").innerHTML = "";
                    showSearchItems(consultaQuery);


                  },
                  (error) => {
                  }
                )
                // handleProductos();
              })
            });
          },
          (error) => {
          }
        );
      };
    },
    (error) => {
    }
  );


};
