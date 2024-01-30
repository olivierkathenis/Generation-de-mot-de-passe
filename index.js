import { prompt } from "./prompt.js";

/**
 * Fonction validateInput
 *
 * Cette fonction valide l'entrée de l'utilisateur en fonction d'une condition spécifiée.
 *
 * @param {string} promptMessage - Le message à afficher à l'utilisateur pour lui demander une entrée.
 * @param {function} condition - La condition que l'entrée de l'utilisateur doit respecter pour être valide.
 * @param {string} errorMessage - Le message d'erreur à afficher si l'entrée de l'utilisateur n'est pas valide.
 *
 * @returns {string} - L'entrée de l'utilisateur si elle est valide.
 */
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
/**
 * Fonction generatePassword
 *
 * Cette fonction génère un mot de passe en fonction des critères spécifiés par l'utilisateur.
 *
 * @param {number} numberCaracter - Le nombre de caractères que le mot de passe doit avoir.
 * @param {string} specialCaracter - Indique si le mot de passe doit contenir des caractères spéciaux ("y" pour oui, "n" pour non).
 * @param {string} number - Indique si le mot de passe doit contenir des chiffres ("y" pour oui, "n" pour non).
 * @param {string} maj - Indique si le mot de passe doit contenir des majuscules ("y" pour oui, "n" pour non).
 * @param {string} phrase - Une phrase dont les premières lettres de chaque mot seront utilisées pour générer le mot de passe.
 *
 * @returns {string} - Le mot de passe généré.
 */
const generatePassword = (
  numberCaracter,
  specialCaracter,
  number,
  maj,
  phrase
) => {
  let lower = phrase
    .split(" ")
    .map((word) => word[0].toLowerCase())
    .join("");
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let conditions = [];
  if (specialCaracter === "y") {
    conditions.push(special);
  }
  if (number === "y") {
    conditions.push(numbers);
  }
  if (maj === "y") {
    conditions.push(upper);
  }

  let remainingCharacters = numberCaracter - lower.length;
  let charactersPerCondition = Math.floor(
    remainingCharacters / conditions.length
  );

  let password = lower; // Ajoute les premières lettres des mots de la phrase au mot de passe

  conditions.forEach((condition) => {
    for (let i = 0; i < charactersPerCondition; i++) {
      password += condition[Math.floor(Math.random() * condition.length)];
    }
  });

  // Si le mot de passe est plus court que le nombre de caractères demandé (à cause de l'arrondi), on ajoute des caractères
  while (password.length < numberCaracter) {
    let randomCondition =
      conditions[Math.floor(Math.random() * conditions.length)];
    password +=
      randomCondition[Math.floor(Math.random() * randomCondition.length)];
  }

  // Mélange le mot de passe
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

console.log(
  `Votre mot de passe généré est : ${generatePassword(
    numberCaracter,
    specialCaracter,
    number,
    maj,
    phrase
  )}`
);
