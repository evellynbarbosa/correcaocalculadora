// IMC DATA
const data = [
  { min: 0, max: 18.4, classification: "Menor que 18,5", info: "Magreza", obesity: "0" },
  { min: 18.5, max: 24.9, classification: "Entre 18,5 e 24,9", info: "Normal", obesity: "0" },
  { min: 25, max: 29.9, classification: "Entre 25,0 e 29,9", info: "Sobrepeso", obesity: "I" },
  { min: 30, max: 39.9, classification: "Entre 30,0 e 39,9", info: "Obesidade", obesity: "II" },
  { min: 40, max: Infinity, classification: "Maior que 40,0", info: "Obesidade grave", obesity: "III" },
];

// Seleção de elementos
const imcTable = document.getElementById("imc-table");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const calcBtn = document.getElementById("calc-btn");
const clearBtn = document.getElementById("clear-btn");
const resultContainer = document.getElementById("result-container");
const imcNumber = document.getElementById("imc-number").querySelector("span");
const imcInfo = document.getElementById("imc-info").querySelector("span");
const backBtn = document.getElementById("back-btn");

// Funções
function createTable(data) {
  data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("table-data");

      const classification = document.createElement("p");
      classification.innerText = item.classification;

      const info = document.createElement("p");
      info.innerText = item.info;

      const obesity = document.createElement("p");
      obesity.innerText = item.obesity;

      div.appendChild(classification);
      div.appendChild(info);
      div.appendChild(obesity);

      imcTable.appendChild(div);
  });
}

function validDigits(text) {
  return text.replace(/[^0-9,]/g, "");
}

function calcImc(height, weight) {
  return weight / (height ** 2);
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.innerText = "";
  imcInfo.innerText = "";
}

function showOrHideResults() {
  resultContainer.classList.toggle("hide");
}

// Init
createTable(data);

// Eventos
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
      const updatedValue = validDigits(e.target.value);
      e.target.value = updatedValue;
  });
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Captura e conversão das entradas
  const weight = parseFloat(weightInput.value.replace(",", "."));
  const heightInCm = parseFloat(heightInput.value.replace(",", "."));

  if (isNaN(weight) || isNaN(heightInCm) || heightInCm <= 0) {
      alert("Por favor, insira valores válidos para peso e altura.");
      return;
  }

  // Conversão de altura de centímetros para metros
  const heightInM = heightInCm / 100;

  // Cálculo do IMC
  const imc = calcImc(heightInM, weight);

  let info;
  data.forEach((item) => {
      if (imc >= item.min && imc <= item.max) {
          info = item.info;
      }
  });

  if (!info) return;

  imcNumber.innerText = imc.toFixed(2).replace(".", ",");
  imcInfo.innerText = info;

  showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cleanInputs();
});

backBtn.addEventListener("click", (e) => {
  cleanInputs();
  showOrHideResults();
});
