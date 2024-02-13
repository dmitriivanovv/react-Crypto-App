import { cryptoAssets, cryptoData } from "./data.js";

export function fakeFetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 150);
  });
}
export function fakeFetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 200);
  });
}
