function capitalize() {
  let str = this;
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
};

String.prototype.capitalize = capitalize;

function removeDiacritics() {
  return this.normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "")
};

String.prototype.removeDiacritics = removeDiacritics