import { categoryURL, productosURL, usersURL} from '../urlsDB.js';
import { fetchData } from '../handlers/fetch_get.js';
import { postData } from '../handlers/fetch_post.js';


import { convertToBase64 } from '../conversores/Filetobase64.js';


export const handleForm = () => {

  const formulario = document.querySelector("[data-form-new]");

  let urlImage = document.querySelector("[data-form-url]");
  let nameProducto = document.querySelector("[data-form-nombre]");
  let precioProducto = document.querySelector("[data-form-precio]");
  let descripcionProducto = document.querySelector("[data-form-descripcion]");

  let inputCatProducto = document.querySelector("[data-form-categoria]");
  let select = document.querySelector("[data-form-category-select]");

  let imageUpload = document.querySelector("[data-form-upload-image]");

  let cleanUpload = document.querySelector("[data-clean-uploadfile]");


  imageUpload.addEventListener("click", () => {
    urlImage.disabled = true;
    urlImage.style.cssText = `cursor: not-allowed;`;
    urlImage.value = "";
  })
  urlImage.addEventListener("change", () => {
    if (!imageUpload.disabled) {
      imageUpload.disabled = true;
      imageUpload.style.cssText = `cursor: not-allowed;`;
      imageUpload.value = "";
    } else {
      imageUpload.disabled = false;
      imageUpload.style.cssText = `cursor: pointer;`;
    }
  })

  cleanUpload.addEventListener("click", () => {
    imageUpload.value = "";
    urlImage.value = "";
    imageUpload.disabled = false;
    urlImage.disabled = false;
    urlImage.style.cssText = `cursor: text;`;
  })




  let categoriaDeclarada = "";

  let mensajes = [];

  let msg = JSON.parse(window.sessionStorage.getItem("msg"));


  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let formImageUpload;

    if (imageUpload.files.length > 0) {
      formImageUpload = new FormData();
      formImageUpload.append("fileToUpload", imageUpload.files[0])
    }

    if (inputCatProducto.value !== "") {
      postData(categoryURL, {"name": inputCatProducto.value}).then(
      // postData('http://localhost:8000/category', {"name": inputCatProducto.value}).then(
        (response) => {
          // console.log(response)

          let mensajeContent = document.querySelector("[data-mensaje-div]");
          let mensajeBanner = document.querySelector("[data-mensaje-span]");
          mensajeContent.style.display = "flex";
          mensajeBanner.innerHTML += `<span>Categoría creada</span>`;

        },
        (error) => {
        }
      );
      categoriaDeclarada = parseInt(select.getAttribute("last")) + 1;


    } else if (select.value !== "") {
      categoriaDeclarada = parseInt(select.value);
    }

    let objetoProducto = {};

    // console.log(formImageUpload !== undefined)
    if (formImageUpload !== undefined) {

      convertToBase64(imageUpload.files[0]).then(
        (response) => {

          objetoProducto = {
            "id": uuid.v4(),
            "name": nameProducto.value,
            "cat": categoriaDeclarada,
            "price": precioProducto.value,
            "img": response,
            "desc": descripcionProducto.value
          };

          // console.log(objetoProducto);

          postData(productosURL, objetoProducto).then(
          // postData('http://localhost:8000/productos', objetoProducto).then(
            (response) => {

              window.scrollTo(0, 0);

              imageUpload.value = "";
              nameProducto.value = "";
              inputCatProducto.value = "";
              precioProducto.value = "";
              urlImage.value = "";
              descripcionProducto.value = "";
              categoriaDeclarada = "";
              select.setAttribute("value", 0);


              let mensajeContent = document.querySelector("[data-mensaje-div]");
              let mensajeBanner = document.querySelector("[data-mensaje-span]");
              mensajeContent.style.display = "flex";
              mensajeBanner.innerHTML += `<span>Producto creado</span>`;


              let closeBanner = document.querySelector("#closeX");
              closeBanner.addEventListener("click", () => {
                mensajeBanner.innerHTML = "";
                mensajeContent.style.display = "none";
              });

            },
            (error) => {
              console.log(error)
            }
          );

        },
        (error) => {
          console.log(error)
        }
      )

    } else {

      objetoProducto = {
        "id": uuid.v4(),
        "name": nameProducto.value,
        "cat": categoriaDeclarada,
        "price": precioProducto.value,
        "img": urlImage.value,
        "desc": descripcionProducto.value
      };

      // console.log(objetoProducto);

      postData(productosURL, objetoProducto).then(
      // postData('http://localhost:8000/productos', objetoProducto).then(
        (response) => {

          window.scrollTo(0, 0);

          imageUpload.value = "";
          nameProducto.value = "";
          inputCatProducto.value = "";
          precioProducto.value = "";
          urlImage.value = "";
          descripcionProducto.value = "";
          categoriaDeclarada = "";
          select.value = 0;


          let mensajeContent = document.querySelector("[data-mensaje-div]");
          let mensajeBanner = document.querySelector("[data-mensaje-span]");
          mensajeContent.style.display = "flex";
          mensajeBanner.innerHTML += `<span>Producto creado</span>`;


          let closeBanner = document.querySelector("#closeX");
          closeBanner.addEventListener("click", () => {
            mensajeBanner.innerHTML = "";
            mensajeContent.style.display = "none";
          });



        },
        (error) => {
          console.log(error)
        }
      );

    }
  });
  mensajes = [];
};


export const selectHandler = () => {
  let select = document.querySelector("[data-form-category-select]");
  fetchData(categoryURL).then(
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

      catProducto.addEventListener('change', () => {
        if (!select.disabled) {
          select.disabled = true;
          select.style.cssText = `cursor: not-allowed;`;

        } else {
          select.disabled = false;
          select.style.cssText = `cursor: text;`;
        }

      })

    },
    (error) => {
    }
  );

};



export const selectEditCategoria = () => {
  let select = document.querySelector("[data-form-category-select]");
  fetchData(categoryURL).then(
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
