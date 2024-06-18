import { ENV } from "../../env";
Net.prototype.constructor.SQL_ERR = "SQL Error";

function befJson(url, callback) {
  return fetch(url).then(response => response.json()).then((data) => {
    if (data.statusCode) {
      console.error(`GET: ${data.statusCode} ${data.status}`);
      if (callback) return callback([])
    } else if (callback) {
      return callback(data)
    }
  })
};

Net.prototype.constructor.befJson = befJson;

function befSend(method, query, callback) {
  method = method.toUpperCase();

  return fetch(ENV.VITE_URL_API, {method, headers: {
    Token: ENV.VITE_BEF_SERVER,
    Database: ENV.VITE_DATABASE,
    Query: query
  }}).then(response => response.json()).then((data) => {
    if (data.status_code === 403 || data.status_code === 405 || data.status === Net.SQL_ERR) {
      console.error(`${method}: ${data.status_code} ${data.status}`);
      if (callback) return callback(false)
    } else if (callback) {
      return callback(true)
    }
  })
};

Net.prototype.constructor.befSend = befSend