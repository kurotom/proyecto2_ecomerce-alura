
export const deleteData = async (url, objetoDELETE) => {
  const setting = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(objetoDELETE)
  }
  const response = await fetch(url, setting);
  const responseJSON = await response.json();
  return responseJSON
}
