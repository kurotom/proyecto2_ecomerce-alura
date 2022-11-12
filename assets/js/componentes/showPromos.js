import { categoryURL, productosURL, usersURL} from '../urlsDB.js';
import { fetchData } from '../handlers/fetch_get.js';
import { deleteData } from '../handlers/fetch_delete.js';
import { handleProductos } from './createContentItems.js';


export const itemsPromos = (url, contenedor) => {

  let direccion = new URL(url);

  let categoria = direccion.search.split("?cat=")[1]

  fetchData(productosURL).then(
    (response) => {

      let productos = response.filter(item => {
        return item.cat === parseInt(categoria)
      })


      let title = document.querySelector("[data-title-category]");
      fetchData(categoryURL).then(
        (response) => {
          let item = response.filter(i => {
            return i.id === parseInt(categoria)
          })
          if (item.length > 0) {
            title.innerText = item[0].name.slice(0, 1).toUpperCase() + item[0].name.slice(1,);
          }
        },
        (error) => {
          console.log(error)
        }
      )



      if (productos.length > 0) {
        // console.log(productos)

        let userData = JSON.parse(window.localStorage.getItem("user"));
        let mostrarOpciones;
        if (userData !== null) {
          mostrarOpciones = userData.isadmin;
        }

        productos.forEach(item => {
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

          contenedor.innerHTML += template;
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


      } else {

      }


    },
    (error) => {

    }
  )
};
