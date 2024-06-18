import { ENV } from "../../env";

class Database {
  query(query, callback) {
    let isSet = this.set(query, (data) => {
      if (callback) return callback(data)
    });

    if (!isSet) {
      return this.get(query, (data) => {
        if (callback) return callback(data)
      })
    }
  };

  get(query, callback) {
    let queryEncode = encodeURIComponent(query);
    let uri = `${ENV.VITE_URL_API}?token=${ENV.VITE_BEF_CLIENT}&database=${ENV.VITE_DATABASE}&query=${queryEncode}`;

    return Net.befJson(uri, (data) => {
      if (callback) return callback(data)
    })
  };

  set(query, callback) {
    let isActive = false;
    let lowQuery = query.toLowerCase();

    if (lowQuery.indexOf("insert into") > -1 || lowQuery.indexOf("create table") > -1) {
      isActive = true;

      Net.befSend("post", query, (data) => {
        if (callback) return callback(data)
      })
    } else if (lowQuery.indexOf("delete") > -1) {
      isActive = true;

      Net.befSend("delete", query, (data) => {
        if (callback) return callback(data)
      })
    } else if (lowQuery.indexOf("update") > -1) {
      isActive = true;

      Net.befSend("patch", query, (data) => {
        if (callback) return callback(data)
      })
    };

    return isActive
  }
};

window._BefDb = new Database