import { fetchData } from '../handlers/fetch_get.js';

// import { showIndex } from './IndexShowContent.js';


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

  fetchData("http://localhost:8000/productos").then(
    (response) => {

      console.log(query)

      let divParent = document.querySelector("[data-main-search]");
      let strongSearch = document.querySelector("[data-title-strong]")

      strongSearch.innerText = `${query}`;

      let coincidencias = response.filter(item => {
        return item.name.search(query) > -1
      });


      if (coincidencias.length === 0) {
        divParent.innerHTML = `<p id="nomatches">Sin coincidencias</p>`

      } else if (coincidencias.length > 0) {
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
      }



    },
    (error) => {

    }
  )


};
