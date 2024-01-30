import { prompt } from "./prompt.js";

function validateInput(promptMessage, condition, errorMessage) {
  let input;
  do {
    try {
      input = prompt(promptMessage);
      if (!condition(input)) {
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error.message);
    }
  } while (!condition(input));
  return input;
}

let numberCaracter = validateInput(
  "Combien de caractères ? (8-36) ",
  (input) => !isNaN(input) && input >= 8 && input <= 36,
  "Veuillez entrer un nombre valide entre 8 et 36."
);

let specialCaracter = validateInput(
  "Caractères spéciaux ? (y/n) ",
  (input) => input === "y" || input === "n",
  "Veuillez entrer 'y' ou 'n'."
);

let number = validateInput(
  "Chiffres ? (y/n) ",
  (input) => input === "y" || input === "n",
  "Veuillez entrer 'y' ou 'n'."
);

let maj = validateInput(
  "Majuscules ? (y/n) ",
  (input) => input === "y" || input === "n",
  "Veuillez entrer 'y' ou 'n'."
);

let phrase = validateInput(
  "Veuillez entrer une phrase :",
  (input) => !/\d/.test(input) && input.split(" ").length <= 15,
  "Veuillez entrer une phrase sans chiffres et avec un maximum de 15 mots."
);

let all = "";

const generatePassword = (
  numberCaracter,
  specialCaracter,
  number,
  maj,
  phrase,
  all
) => {
  let password = "";
  all += phrase
    .split(" ")
    .map((word) => word[0].toLowerCase())
    .join("");
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  if (specialCaracter === "y") {
    all += special;
  }
  if (number === "y") {
    all += numbers;
  }
  if (maj === "y") {
    all += upper;
  }
  for (let i = 0; i < numberCaracter; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }
  return password;
};

console.log(
  `Votre mot de passe généré est : ${generatePassword(
    numberCaracter,
    specialCaracter,
    number,
    maj,
    phrase,
    all
  )}`
);

// let all = phrase
//   ? phrase
//       .split(" ")
//       .map((word) => word[0].toLowerCase())
//       .join("")
//   : "";

// console.log(phrase);
// console.log(all);
