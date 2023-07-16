import { symbols } from "../const";

export interface PasswordOptions {
  number?: boolean;
  upper?: boolean;
  lower?: boolean;
  symbol?: boolean;
  length?: number;
}

function secureMathRandom() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / (2 ** 32 - 1);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
}
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

export function generatePassword(options?: PasswordOptions) {
  const { number = true, upper = true, lower = true, symbol = true, length = 16 } = options || {};
  const _options = [{ number }, { upper }, { lower }, { symbol }].filter(item => Object.values(item)[0]);
  let password = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(secureMathRandom() * _options.length);
    const key = Object.keys(_options[index])[0];
    password += randomFunc[key]();
  }
  return password.slice(0, length).split("").sort(() => Math.random() - 0.5).join("");
}

