
export const postData = async (url, objetoPOST) => {

  const setting = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(objetoPOST)
  }
  const response = await fetch(url, setting);
  const responseJSON = await response.json();
  return responseJSON;
}
