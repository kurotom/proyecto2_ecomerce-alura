

export const postCreateUser = (objetoDataUsuario, url) => {

  const postUser = (objetoDataUsuario, urlPOST) => {
    const settings = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objetoDataUsuario)
    }
    const response = await fetch(urlPOST, settings);
    const responseJSON = await response.json();
    return responseJSON;
  }

  postUser(url)




}
