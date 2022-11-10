
export const loginBoton = () => {

  let botonLogin = document.querySelector("#loginBtn");
  let userData = JSON.parse(window.localStorage.getItem("user"));
  if (userData !== null && Object.keys(userData).length > 0) {
    botonLogin.innerText = userData.name.slice(0, 1).toUpperCase() + userData.name.slice(1,);
    botonLogin.setAttribute("href", "panel.html")
  } else {
    botonLogin.innerText = "Login";
  }

};
