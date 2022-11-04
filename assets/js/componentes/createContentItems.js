import fetchData from '../handlers/fetch_get.js';


export const handleProductos = (parentDiv, productosIterable=[]) => {

  let contenedorProductos = parentDiv;

  if (productosIterable.length === 0) {
    fetchData('http://localhost:8000/productos').then(
      (response) => {
        response.forEach(item => {
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
                <a href="descripcion.html?id=${item.id}">Ver producto</a>
              </div>
            </div>`;

          contenedorProductos.innerHTML += template;


        })

        let editarBtn = document.querySelectorAll("#edit");
        let borrarBtn = document.querySelectorAll("#delete");


        editarBtn.forEach(item => {
          item.addEventListener('click', () => {
            const itemID = item.parentNode.getAttribute("value");
            console.log(itemID);


          })
        });
        borrarBtn.forEach(item => {
          item.addEventListener("click", () => {
            const itemID = item.parentNode.getAttribute("value");
            console.log(itemID);


            handleProductos();
          })
        });

      },
      (error) => {
        console.log(error)
      }
    )
  } else if (productosIterable.length > 0) {
    productosIterable.forEach(item => {
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
            <a href="descripcion.html?id=${item.id}">Ver producto</a>
          </div>
        </div>`;

      contenedorProductos.innerHTML += template;

    })


  }


};
