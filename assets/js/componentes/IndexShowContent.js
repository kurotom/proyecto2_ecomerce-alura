import { categoryURL, productosURL, usersURL, descuentoURL} from '../urlsDB.js';

import { fetchData } from '../handlers/fetch_get.js';



export const showIndex = () => {

  let contenedor = document.querySelector("#contenido");



  fetchData(categoryURL).then(
  // fetchData('http://localhost:8000/category').then(
    (response) => {
      // console.log(response)
      response.forEach(item => {
        let fila = document.createElement('div')
        fila.setAttribute("id", `fila${item.id}`);
        fila.setAttribute("class", "fila_content");
        fila.setAttribute("value", `${item.id}`);
        contenedor.appendChild(fila);

        let head_producto = `<div id="fila${item.id}__head" class="fila_head">
          <span>${item.name}</span>
          <a href="productos.html" title="Todos los productos">
            Ver todo
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>`;

        let fila_productos = `<div id="fila${item.id}__productos" class="fila__productos" value=${item.id}></div>`

        fila.innerHTML += head_producto;
        fila.innerHTML += fila_productos;

      })

      fetchData(productosURL).then(
      // fetchData('http://localhost:8000/productos').then(
        (response) => {
          // console.log(response)
          let productosItems = response;
          let productContenedor = contenedor.querySelectorAll(".fila__productos")

          fetchData(descuentoURL).then(
            (response) => {

              productContenedor.forEach(itemParent => {
                productosItems.map(item => {
                  if (item.cat === parseInt(itemParent.getAttribute('value'))) {
                    let productoHTML = `<div class="producto">
                      <img src="${item.img}" alt="productos">
                      <div class="producto__info">
                        <span class="producto__info-name">${item.name}</span>
                        ${
                          parseInt(response[0].catid) === parseInt(item.cat)
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

                    itemParent.innerHTML += productoHTML;
                  }
                });
              });


            },
            (error) => {
            }
          )

          // productContent.forEach(itemParent => {
          //   response.map(item => {
          //     if (item.cat === parseInt(itemParent.getAttribute('value'))) {
          //       let productoHTML = `<div class="producto">
          //         <img src="${item.img}" alt="productos">
          //         <div class="producto__info">
          //           <span>${item.name}</span>
          //           <span>$ ${item.price}</span>
          //           <a href="descripcion.html?item=${item.id}" title="Ir al producto">Ver producto</a>
          //         </div>
          //       </div>`;
          //
          //       itemParent.innerHTML += productoHTML;
          //     }
          //   });
          // });



        },
        (error) => {
          console.log(error)
        }
      )

    },
    (error) => {
      console.log(error)
    }
  )
};
