const chooseImage = document.getElementById("file"),
  compressBtn = document.querySelector(".compress"),
  displayImage = document.querySelector(".image"),
  percent = document.getElementById("percentage"),
  percentRange = document.getElementById("compressPercent"),
  displaySize = document.querySelector(".size"),
  downloadImage = document.querySelector(".downloadImage"),
  compress = document.querySelector(".compress");

let files;

function fetchData() {
  return new Promise((resolve) => setTimeout(resolve, 200));
}

function downloadFile(url, fileName) {
  //   fetch(url, {
  //     method: "get",
  //     mode: "no-cors",
  //     referrerPolicy: "no-referrer",
  //   })
  //     .then((res) => res)
  //     .then((res) => {
  //       const aElement = document.createElement("a");
  //       aElement.setAttribute("download", fileName);
  //       //   const href = URL.createObjectURL(res);
  //       aElement.href = url;
  //       aElement.setAttribute("target", "_blank");
  //       aElement.click();
  //       console.log(aElement.href);
  //       //   URL.revokeObjectURL(href);
  //     });

  const aElement = document.createElement("a");
  aElement.setAttribute("download", fileName);
  //   const href = URL.createObjectURL(res);
  aElement.href = url;
  aElement.setAttribute("target", "_blank");
  aElement.click();
}

downloadImage.addEventListener("click", async function () {
  if (downloadImage.getAttribute("data")) {
    downloadImage.removeAttribute("data");
    return alert("There is no file to download");
  }

  const compressImage = await compressorFunc(percent.innerHTML, files);
  console.log(compressImage);
  downloadFile(compressImage, "compressed-image");
});

chooseImage.addEventListener("change", async function (event) {
  files = event.target.files[0];
  const compressImage = await compressorFunc(percent.innerHTML, files);
  var size = atob(compressImage.split(",")[1]).length;
  let mb = size / 1000000;
  let kb = size / 1000;
  displaySize.innerHTML = `${mb.toFixed(2)}MB -- ${kb.toFixed(2)}KB`;
  displayImage.style.backgroundImage = "url(" + compressImage + ")";
  compress.style.display = "block";
  downloadImage.removeAttribute("disabled");
  // percentRange.value = 0;
  // percent.innerHTML = 0;
  // displaySize.innerHTML = "";
});

percentRange.onchange = async function () {
  const bgImage = files;
  const compressImage = await compressorFunc(percent.innerHTML, bgImage);
  var size = atob(compressImage.split(",")[1]).length;
  let mb = size / 1000000;
  let kb = size / 1000;
  displaySize.innerHTML = `${mb.toFixed(2)}MB -- ${kb.toFixed(2)}KB`;
  displayImage.style.backgroundImage = "url(" + compressImage + ")";
};

async function compressorFunc(percent, blobImage) {
  const bitmapImage = await createImageBitmap(blobImage);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = bitmapImage.width;
  canvas.height = bitmapImage.height;

  ctx.drawImage(bitmapImage, 0, 0);
  let url = canvas.toDataURL("image/jpeg", percent / 100);
  return url;
}

// function stringToBytesFaster(str) {
//   //http://stackoverflow.com/questions/1240408/reading-bytes-from-a-javascript-string
//   var ch,
//     st,
//     re = [],
//     j = 0;
//   for (var i = 0; i < str.length; i++) {
//     ch = str.charCodeAt(i);
//     if (ch < 127) {
//       re[j++] = ch & 0xff;
//     } else {
//       st = []; // clear stack
//       do {
//         st.push(ch & 0xff); // push byte to stack
//         ch = ch >> 8; // shift value down by 1 byte
//       } while (ch);
//       // add stack contents to result
//       // done because chars have "wrong" endianness
//       st = st.reverse();
//       for (var k = 0; k < st.length; ++k) re[j++] = st[k];
//     }
//   }
//   // return an array of bytes
//   return re;
// }
