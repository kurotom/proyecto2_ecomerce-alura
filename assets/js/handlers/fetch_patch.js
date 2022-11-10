
export const patchData = async (url, objetoPOST) => {
  const setting = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(objetoPOST)
  }
  const response = await fetch(url, setting);
  const responseJSON = await response.json();
  return responseJSON;
}
