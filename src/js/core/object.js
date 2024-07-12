function jsonPretty(space=2) {
  let strResult = JSON.stringify(this, null, space);

  let escapedResult = strResult.replaceAll(/&/g, "&amp;").replaceAll(
    /</g,
    "&lt;"
  ).replaceAll(/>/g, "&gt;").replaceAll(/"/g, "&quot;").replaceAll(
    /'/g,
    "&#039;"
  );

  return escapedResult
};

Object.prototype.jsonPretty = jsonPretty