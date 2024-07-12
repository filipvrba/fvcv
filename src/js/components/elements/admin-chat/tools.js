export default class CTools {
  searchToUse(message, callback) {
    switch (true) {
    case new RegExp(`^${CTools.BEF}`, "m").test(message):
      return this.fnBef(message, m => callback(m))
    }
  };

  fnBef(message, callback) {
    let query;
    let regexBefQuery = new RegExp(`^${CTools.BEF}.query`, "m");

    switch (true) {
    case regexBefQuery.test(message):

      query = message.replace(regexBefQuery, "").trim().replaceAll(
        /^[("']{1,2}|[)"']{1,2}$/gm,
        ""
      );

      _BefDb.query(query, (rows) => {
        let strJson = rows.jsonPretty();
        callback(strJson);
        return
      });

      break;

    default:
      return callback(`${`
Backend Filip REST API
This is a backend that is communicated with via rest api.

Usage: bef.[functions]

Functions:
┌ query(...)
└─ Executes a query for the backend using an SQL query.
      `}`)
    }
  }
};

CTools.BEF = "bef"