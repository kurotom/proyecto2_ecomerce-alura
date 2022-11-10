import { fetchData } from '../handlers/fetch_get.js';
import { postData } from '../handlers/fetch_post.js';


export const handleForm = () => {

  const formulario = document.querySelector("[data-form-new]");

  let urlImage = document.querySelector("[data-form-url]");
  let nameProducto = document.querySelector("[data-form-nombre]");
  let precioProducto = document.querySelector("[data-form-precio]");
  let descripcionProducto = document.querySelector("[data-form-descripcion]");

  let inputCatProducto = document.querySelector("[data-form-categoria]");
  let select = document.querySelector("[data-form-category-select]");

  let categoriaDeclarada = "";

  let mensajes = [];

  let msg = JSON.parse(window.sessionStorage.getItem("msg"));


  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (inputCatProducto.value !== "") {
      postData('http://localhost:8000/category', {"name": inputCatProducto.value}).then(
        (response) => {
          // console.log(response)
          console.log("Done")

          if (msg !== null) {
            mensajes.push(`<span>Categoría creada</span>`);
            window.sessionStorage.removeItem("msg");
            window.sessionStorage.setItem("msg", JSON.stringify(mensajes));
          } else {
            mensajes.push(`<span>Categoría creada</span>`);
            window.sessionStorage.setItem("msg", JSON.stringify(mensajes));
          }

        },
        (error) => {
        }
      );
      categoriaDeclarada = parseInt(select.getAttribute("last")) + 1;


    } else if (select.value !== "") {
      categoriaDeclarada = parseInt(select.value);
    }


    let objetoProducto = {
      "id": uuid.v4(),
      "name": nameProducto.value,
      "cat": categoriaDeclarada,
      "price": precioProducto.value,
      "img": urlImage.value,
      "desc": descripcionProducto.value
    };

    postData('http://localhost:8000/productos', objetoProducto).then(
      (response) => {

        // selectHandler();

        nameProducto.value = "";
        inputCatProducto.value = "";
        precioProducto.value = "";
        urlImage.value = "";
        descripcionProducto.value = "";
        categoriaDeclarada = "";
        select.value = 0;

        window.scrollTo(0, 0);


        if (msg !== null) {
          mensajes.push(`<span>Producto creado</span>`);
          window.sessionStorage.removeItem("msg");
          window.sessionStorage.setItem("msg", JSON.stringify(mensajes));

        } else {
          mensajes.push(`<span>Producto creado</span>`);
          window.sessionStorage.setItem("msg", JSON.stringify(mensajes));

        }

      },
      (error) => {
        console.log(error)
      }
    );

  });
  mensajes = [];
};


export const selectHandler = () => {
  let select = document.querySelector("[data-form-category-select]");
  fetchData('http://localhost:8000/category').then(
    (response) => {
      response.map(item => {
        let template = `<option id="${item.name}" value="${item.id}">${item.name}</option>`;
        select.innerHTML += template;
      });

      select.setAttribute("last", response.length);

      let catProducto = document.querySelector("[data-form-categoria]");
      select.addEventListener("change", (evento) => {
        if (parseInt(evento.target.value) !== 0) {
          catProducto.value = "";
          catProducto.disabled = true;
          catProducto.style.cssText = `cursor: not-allowed;`;

        } else {
          catProducto.value = "";
          catProducto.disabled = false;
          catProducto.style.cssText = `cursor: text;`;

        }
      })
    },
    (error) => {
    }
  );

};



export const selectEditCategoria = () => {
  let select = document.querySelector("[data-form-category-select]");
  fetchData('http://localhost:8000/category').then(
    (response) => {
      response.map(item => {
        let template = `<option id="${item.name}" value="${item.id}">${item.name}</option>`;
        select.innerHTML += template;
      });

    },
    (error) => {
    }
  );

};
