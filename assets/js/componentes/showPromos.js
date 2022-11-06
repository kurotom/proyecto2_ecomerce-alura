import { fetchData } from '../handlers/fetch_get.js';
import { handleProductos } from './createContentItems.js';


export const itemsPromos = (url, contenedor) => {

  let direccion = new URL(url);

  let categoria = direccion.search.split("?cat=")[1]

  fetchData('http://localhost:8000/productos').then(
    (response) => {

      let productos = response.filter(item => {
        return item.cat === parseInt(categoria)
      })


      let title = document.querySelector("[data-title-category]");
      fetchData('http://localhost:8000/category').then(
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

        handleProductos(contenedor, productos)

      } else {

      }


    },
    (error) => {

    }
  )
};
