import { sha512 } from "js-sha512";
import { symbols } from "../const";
import type { PasswordOptions } from "./random";

const lowerChar = "abcdefghijklmnopqrstuvwxyz".split("");
const upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numberChar = "0123456789".split("");
const symbolChar = symbols.split("");

function hexPassword(seed: string, flag: string) {
  const hex1 = sha512.hmac(seed, flag);
  const hex2 = sha512.hmac("wa", hex1);
  const hex3 = sha512.hmac("lyj", hex1);

  const source = hex2.split("");
  const rule = hex3.split("");
  console.assert(rule.length === source.length, "sha512长度错误！");

  // 字母大小写转换
  for (let i = 0; i < source.length; ++i) {
    if (isNaN(Number(source[i]))) {
      const str = "whenthecatisawaythemicewillplay666";
      if (str.search(rule[i]) > -1) {
        source[i] = source[i].toUpperCase();
      }
    }
  }
  return source.join("");
}

const matchCase = {
  lower: lowerChar,
  upper: upperChar,
  number: numberChar,
  symbol: symbolChar,
};

export function generateConstantPassword(seed: string, flag: string, options?: PasswordOptions) {
  const hash = hexPassword(seed, flag);
  const { number = true, upper = true, lower = true, symbol = true, length = 16 } = options || {};
  const characters: string[] = [];
  number && characters.push(...numberChar);
  upper && characters.push(...upperChar);
  lower && characters.push(...lowerChar);
  symbol && characters.push(...symbolChar);

  for (let i = 0; i <= hash.length - length; i++) {
    const subHash = hash.slice(i, i + length).split("");
    let count = 0;
    const mapIndex = subHash.map((c) => {
      count = (count + c.charCodeAt(0)) % characters.length;
      return count;
    });
    const seekPwd = mapIndex.map(i => characters[i]);

    const matched = [{ lower: !lower }, { upper: !upper }, { number: !number }, { symbol: !symbol }];
    seekPwd.forEach((item) => {
      matched.forEach((match) => {
        const key = Object.keys(match)[0];
        match[key] = match[key] || matchCase[key].includes(item);
      });
    });

    if (!matched.find(item => !Object.values(item)[0])) {
      return seekPwd.join("");
    }
  }

  return "";
}
