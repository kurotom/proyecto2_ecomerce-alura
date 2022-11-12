
export const convertToBase64 = (file) => {

  return new Promise((resolve, reject) => {

    if (file.size === 0) {
      reject(new Error("Sin fichero"));
    }

    let formato = "";
    let headerBase64 = "";

    let pngRE = /.*\w+\.png$/gm
    let jpgRE = /.*\w+\.jpg$/gm
    let webpRE = /.*\w+\.webp$/gm

    if (file.name.match(pngRE).length > 0) {
      formato = "png"
    } else if (file.name.match(jpgRE) > 0) {
      formato = "jpg"
    } else if (file.name.match(webpRE) > 0) {
      formato = "webp"
    }


    headerBase64 = `data:image/${formato};base64,`;


    let imageBase64Stringsep;
    let base64String = "";

    let fileReader = new FileReader()
    fileReader.onload = function () {
      base64String = fileReader.result.replace("data:", "").replace(/^.+,/, "");
      imageBase64Stringsep = base64String;
      resolve(headerBase64 + base64String);
    }
    fileReader.readAsDataURL(file);

  });


}
