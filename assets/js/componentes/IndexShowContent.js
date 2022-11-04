import { fetchData } from '../handlers/fetch_get.js';


export const showIndex = () => {

  let contenedor = document.querySelector("#contenido");


  fetchData('http://localhost:8000/category').then(
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
          <a href="productos.html">
            Ver todo
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>`;

        let fila_productos = `<div id="fila${item.id}__productos" class="fila__productos" value=${item.id}>
        </div>`

        fila.innerHTML += head_producto;
        fila.innerHTML += fila_productos;

      })


      fetchData('http://localhost:8000/productos').then(
        (response) => {
          // console.log(response)
          let productContent = contenedor.querySelectorAll(".fila__productos")

          productContent.forEach(itemParent => {
            response.map(i => {
              if (i.cat === parseInt(itemParent.getAttribute('value'))) {
                let productoHTML = `<div class="producto">
                  <img src="${i.img}" alt="productos">
                  <div class="producto__info">
                    <span>${i.name}</span>
                    <span>$ ${i.price}</span>
                    <a href="descripcion.html">Ver producto</a>
                  </div>
                </div>`;

                itemParent.innerHTML += productoHTML;
              }
            });

          });

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
