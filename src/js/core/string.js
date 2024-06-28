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

String.prototype.encodePrettyJson = encodePrettyJson;

function decodeBase64() {
  return CryptoJS.enc.Base64.parse(this).toString(CryptoJS.enc.Utf8)
};

String.prototype.decodeBase64 = decodeBase64;

function encodeBase64() {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this))
};

String.prototype.encodeBase64 = encodeBase64;

function toDate() {
  let date = new Date(this);
  let sIsoDate = date.toISOString().replace(/T.*$/m, "").split("-");
  let day = sIsoDate[2];
  let month = sIsoDate[1];
  let year = sIsoDate[0];
  return `${day}. ${month}. ${year}`
};

String.prototype.toDate = toDate;

function sizeInKb() {
  let encoder = new TextEncoder;
  let encodedString = encoder.encode(this);
  let byteLength = encodedString.length;
  let sizeKb = byteLength / 1_024;
  return Math.ceil(sizeKb)
};

String.prototype.sizeInKb = sizeInKb;

function maxLength(length=120) {
  if (this.length > length) {
    return this.substring(0, length) + "..."
  } else {
    return this
  }
};

String.prototype.maxLength = maxLength