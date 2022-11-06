import { fetchData } from '../handlers/fetch_get.js';

export const showDescripcion = (idItem) => {
  // console.log(idItem);

  let descripcionProducto = document.querySelector("[data-descripcion-producto]");
  let contenedorProductosSimilares = document.querySelector("[data-content-similares]");

  fetchData('http://localhost:8000/productos').then(
    (response) => {

      let itemConsultado = response.filter(item => {
        return item.id === idItem
      })

      let itemFiltrado = itemConsultado[0];


      descripcionProducto.innerHTML += mostrarDescripcionProducto(itemFiltrado);




      let similares = response.filter(item => {
        return itemFiltrado.cat === item.cat
      })

      let mostrarNoRepetidos = similares.filter(item => {
        return item.id !== itemFiltrado.id
      })

      mostrarNoRepetidos.forEach(item => {
        contenedorProductosSimilares.innerHTML += mostrarItems(item);
      })



    },
    (error) => {

    }
  )

};



const mostrarItems = (item) => {

  let template =  `
  <div class="similares__productos">
    <img src="${item.img}" alt="productos">
    <div class="producto__info">
      <span>${item.name.slice(0,1).toUpperCase() + item.name.slice(1,)}</span>
      <span>$ ${item.price}</span>
      <a href="descripcion.html?item=${item.id}" title="Ir al producto">Ver producto</a>
    </div>
  </div>`;

  return template;
};


const mostrarDescripcionProducto = (item) => {
  let template = `
  <img id="description__img" src="${item.img}" alt="productos">
  <div id="description__datos" class="">
    <h1>${item.name.slice(0,1).toUpperCase() + item.name.slice(1,)}</h1>
    <span>$ ${item.price}</span>
    <p>
      ${
        item.desc === ""
        ? "Sin descripción"
        : item.desc
      }
    </p>
  </div>
  `
  return template;
}
