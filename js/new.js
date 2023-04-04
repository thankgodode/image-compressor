const chooseImage = document.getElementById("file"),
  compressBtn = document.querySelector(".compress"),
  displayImage = document.querySelector(".image"),
  percent = document.getElementById("percentage"),
  percentRange = document.getElementById("compressPercent"),
  displaySize = document.querySelector(".size"),
  downloadBtn = document.querySelector(".downloadImage"),
  rangeCompressor = document.querySelector(".compress"),
  preloaderEffect = document.querySelector(".loaderWrapper"),
  imgPreloader = document.querySelector(".imgLoader");

let files;

function fetchData() {
  return new Promise((resolve) =>
    setTimeout(resolve, 1000, compressorFunc(percent.innerHTML, files))
  );
}

//Download compressed image function
function downloadFile(url, fileName) {
  const aElement = document.createElement("a");
  aElement.setAttribute("download", fileName);
  aElement.href = url;
  aElement.click();
}

//Download button
downloadBtn.addEventListener("click", async function () {
  downloadBtn.innerHTML = "Downloading";
  const compressImage = await fetchData();

  setTimeout(() => {
    downloadBtn.innerHTML = "Download";
  }, 2000);

  downloadBtn.innerHTML = "Downloaded";

  downloadFile(compressImage, "img");
});

//Select image eventlistener
chooseImage.addEventListener("change", async function (event) {
  //If no image was selected alert the user
  if (!event.target.files[0]) {
    return alert("Please choose an image");
  }

  //If above condition was not met, then continue...
  files = event.target.files[0];
  displaySize.innerHTML = "Loading...";
  preloaderEffect.style.display = "flex";

  const compressImage = await fetchData();

  downloadBtn.removeAttribute("disabled");
  displayImage.style.backgroundImage = "url(" + compressImage + ")";
  var size = atob(compressImage.split(",")[1]).length;
  console.log("Decoded: ", size, "Size: ", atob(compressImage.split(",")[1]));
  let mb = size / 1000000;
  let kb = size / 1000;
  rangeCompressor.style.display = "block";
  displaySize.innerHTML = `${mb.toFixed(2)}MB -- ${kb.toFixed(2)}KB`;
  preloaderEffect.style.display = "none";
});

//Percent increament or decreament eventlistener
percentRange.onchange = async function () {
  const bgImage = files;
  displaySize.innerHTML = "Loading...";
  preloaderEffect.style.display = "flex";

  //Run no codes below me until I have finished running
  const compressImage = await fetchData();

  var size = atob(compressImage.split(",")[1]).length;
  let mb = size / 1000000;
  let kb = size / 1000;
  displaySize.innerHTML = `${mb.toFixed(2)}MB -- ${kb.toFixed(2)}KB`;
  preloaderEffect.style.display = "none";
  displayImage.style.backgroundImage = "url(" + compressImage + ")";
};

//Compressor function
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
