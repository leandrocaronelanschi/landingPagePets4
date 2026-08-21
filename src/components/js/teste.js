const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const arrayAtual = array.slice(0, 4);
const qtdDepoimentos = 4;
let indiceAtual = 4;
const button = document.querySelector(".button");

button.addEventListener("click", () => {
  if (indiceAtual < array.length) {
    const parte = array.slice(indiceAtual, indiceAtual + qtdDepoimentos);
    // arrayAtual.push(...parte);

    indiceAtual += qtdDepoimentos;

    console.log(arrayAtual);
    console.log(parte);
  }
});
