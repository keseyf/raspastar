import { pixPrizes } from "./utils";

export function generateRandomUsername(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let username = "";

  // garantir ao menos 6 letras
  for (let i = 0; i < 6; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }

  // mais 4 números
  for (let i = 0; i < 4; i++) {
    username += numbers[Math.floor(Math.random() * numbers.length)];
  }

  for (let i = 0; i < 2; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }

  const visiblePart = username.slice(3, -6);
  return "***" + visiblePart + "**";
}

export function pom(){
        const results = ["pix", "prêmio"]
        const randomI = Math.floor(Math.random() * results.length)        
        return results[randomI]
    }


export function genRandomUser(){
  return {username: generateRandomUsername(), prize: pom()}
}

// Generate Random Pix
export function grp(){
  const randomI = Math.floor(Math.random() * pixPrizes.length)
  return pixPrizes[randomI]
}

export function grv(): string {
  const min = 500;
  const max = 10000;

  // arredonda para múltiplo de 100
  const value = Math.floor(
    (Math.random() * (max - min) + min) / 100
  ) * 100;

  // formata com separador de milhar (pt-BR)
  return value.toLocaleString("pt-BR");
}
