import { categoryURL, productosURL, usersURL} from '../urlsDB.js';
import { fetchData } from '../handlers/fetch_get.js';
import { deleteData } from '../handlers/fetch_delete.js';


export const handleProductos = (parentDiv, productosIterable=[]) => {

  // BOTON CERRAR ALERTAS
  let closeBanner = document.querySelector("[data-msg-close]");
  closeBanner.addEventListener("click", () => {
    // mensajeBanner.innerHTML = "";
    document.querySelector("[data-msg]").style.display = "none";
  });
  //
  //



  let contenedorProductos = parentDiv;

  if (productosIterable.length === 0) {
    fetchData(productosURL).then(
      (response) => {

        let userData = JSON.parse(window.localStorage.getItem("user"));
        let mostrarOpciones;
        if (userData !== null) {
          mostrarOpciones = userData.isadmin;
        }

        response.forEach(item => {
          let template;
          if (mostrarOpciones) {
            template =  `
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

          } else {
            template =  `
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
          }

          contenedorProductos.innerHTML += template;


        })

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
            deleteData(productosURL + `${itemID}`, {"id": itemID}).then(
              (response) => {

                let content = document.querySelector("[data-msg-span]");
                content.innerHTML += `<span>Elemento borrado</span>`;
                document.querySelector("[data-msg]").style.display = "flex";


              },
              (error) => {
              }
            )
          })
        });

      },
      (error) => {
        console.log(error)
      }
    )
  }
};
