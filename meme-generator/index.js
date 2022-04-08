const button = document.querySelector('button');
const memeField = document.querySelector('div');
const url = "https://meme-api.herokuapp.com/gimme";
const image_dimensions = [500, 500];

const getRidOfElement = (element, interval) => {
  setTimeout(() => {
    element.remove();
  }, interval);
}

const copyMemeUrl = (url) => {
  navigator.clipboard.writeText(url);
  alert("Copied to clipboard!");
}

const setImageProperties = (img, src) => {
  img.src = src;
  img.width = image_dimensions[0];
  img.height = image_dimensions[1];
  img.classList.add("animate__animated", "animate__bounceInLeft")
}

const fetchMeme = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const img = document.createElement('img');
  setImageProperties(img, data.url);
  memeField.appendChild(img);
  const copyButton = document.createElement('button');
  copyButton.innerText = "Copy meme url";
  copyButton.classList.add("animate__animated", "animate__bounceInRight");
  copyButton.onclick = () => copyMemeUrl(data.url);
  document.body.appendChild(copyButton);
  getRidOfElement(copyButton, 10000)
  getRidOfElement(img, 10000);
}

button.onclick = fetchMeme;