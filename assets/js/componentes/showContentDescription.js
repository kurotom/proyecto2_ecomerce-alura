import { categoryURL, productosURL, usersURL, descuentoURL} from '../urlsDB.js';
import { fetchData } from '../handlers/fetch_get.js';

export const showDescripcion = (idItem) => {
  // console.log(idItem);

  let descripcionProducto = document.querySelector("[data-descripcion-producto]");
  let contenedorProductosSimilares = document.querySelector("[data-content-similares]");

  fetchData(productosURL).then(
    (response) => {

      let productosResponse = response;

      fetchData(descuentoURL).then(
        (response) => {

          let descuentoProducto = response[0];

          // Filtra producto por su id
          let itemConsultado = productosResponse.filter(item => {
            return item.id === idItem
          })
          // Asigna el producto
          let itemFiltrado = itemConsultado[0];
          // Entrega datos a funcion junto con categŕia de descuento
          descripcionProducto.innerHTML += mostrarDescripcionProducto(itemFiltrado, descuentoProducto);

          // Filtra productos dentro de la misma categpría
          let similares = productosResponse.filter(item => {
            return itemFiltrado.cat === item.cat
          })
          // Filtra productos similares y quita producto principal consultado
          let mostrarNoRepetidos = similares.filter(item => {
            return item.id !== itemFiltrado.id
          })

          if (mostrarNoRepetidos.length === 0) {
            contenedorProductosSimilares.innerHTML += `<h1 id="no__similares">Sin produtos similares</h1>`;
          } else {
            // Itera y entrega datos a funcion junto con categŕia de descuento
            mostrarNoRepetidos.forEach(item => {
              contenedorProductosSimilares.innerHTML += mostrarItems(item, descuentoProducto);
            })

          };


        },
        (error) => {
        }
      );
    },
    (error) => {

    }
  )

};



const mostrarItems = (item, categoriaDescuento) => {
  let template =  `
  <div class="similares__productos">
    <img src="${item.img}" alt="productos">
    <div class="producto__info">
      <span>${item.name.slice(0,1).toUpperCase() + item.name.slice(1,)}</span>
      ${
        parseInt(categoriaDescuento.catid) === parseInt(item.cat)
        ? `<div>
            <span class="producto__info-precio-original">$ ${item.price}</span>
            <span class="producto__info-precio-descuento">$ ${ (item.price - ((categoriaDescuento.desc * item.price) / 100)).toFixed(1) }</span>
          </div>`
        : `<span class="producto__info-precio">$ ${item.price}</span>`
      }
      <a href="descripcion.html?item=${item.id}" title="Ir al producto">Ver producto</a>
    </div>
  </div>`;

  return template;
};


const mostrarDescripcionProducto = (item, categoriaDescuento) => {
  let template = `
  <img id="description__img" src="${item.img}" alt="productos">
  <div id="description__datos" class="">
    <h1>${item.name.slice(0,1).toUpperCase() + item.name.slice(1,)}</h1>
    ${
      parseInt(categoriaDescuento.catid) === parseInt(item.cat)
      ? `<div>
          <span class="producto__info-precio-original">$ ${item.price}</span>
          <span class="producto__info-precio-descuento">$ ${ (item.price - ((categoriaDescuento.desc * item.price) / 100)).toFixed(1) }</span>
        </div>`
      : `<span class="producto__info-precio">$ ${item.price}</span>`
    }
    <p>
      ${
        item.descripcion === ""
        ? "Sin descripción"
        : item.descripcion
    }
    </p>
  </div>
  `
  return template;
}
