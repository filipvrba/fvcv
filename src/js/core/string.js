import CryptoJS from "crypto-js";

function capitalize() {
  let str = this;
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
};

String.prototype.capitalize = capitalize;

function removeDiacritics() {
  return this.normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "")
};

String.prototype.removeDiacritics = removeDiacritics;

function decodePrettyJson(spaces=4) {
  let dataDecode = CryptoJS.enc.Base64.parse(this).toString(CryptoJS.enc.Utf8);
  let jsonObj = JSON.parse(dataDecode);
  return JSON.stringify(jsonObj, null, spaces)
};

String.prototype.decodePrettyJson = decodePrettyJson;

function encodePrettyJson() {
  let jsonObj = JSON.parse(this);
  let jsonStr = JSON.stringify(jsonObj);
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(jsonStr))
};

String.prototype.encodePrettyJson = encodePrettyJson