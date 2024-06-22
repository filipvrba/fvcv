import ElmAdmin from "./elm_admin";
import ElmAlert from "./elm_alert";

export default class ElmAdminWebsites extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>";

    _BefDb.get(
      `SELECT user_id, name, description, url, image_id FROM websites WHERE user_id = ${ElmAdmin.LOGIN_ID};`,
      rows => this.initElm(rows)
    );

    window.adminBtnSaveWebsites = this.adminBtnSaveWebsites.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  generateInsertQuery() {
    let websitesJson = document.getElementById("floatingWebsitesTextarea").value;
    let websitesObj = JSON.parse(websitesJson);
    if (websitesObj.length <= 0) return null;
    let result = ["INSERT INTO websites (user_id, name, description, url, image_id) VALUES"];

    websitesObj.forEach((row, i) => {
      let symbolEnd = websitesObj.length === (i + 1) ? ";" : ",";
      let nameEncode = row.name.encodeBase64();
      let descriptionEncode = row.description.encodeBase64();
      let queryRow = `(${row.user_id}, '${nameEncode}', '${descriptionEncode}', '${row.url}', ${row.image_id})${symbolEnd}`;
      return result.push(queryRow)
    });

    return result.join(" ").trim()
  };

  adminBtnSaveWebsites() {
    let query = this.generateInsertQuery();

    if (!query) {
      Events.emit(
        "#app",
        ElmAlert.ENVS.SHOW,
        {endTime: 7, message: "Chyba uložení webů. Je prázný editor!"}
      );

      return
    };

    return _BefDb.set("DELETE FROM websites;", (isDeleted) => {
      if (isDeleted) {
        return _BefDb.set(query, (isSave) => {
          if (isSave) {
            return Events.emit(
              "#app",
              ElmAlert.ENVS.SHOW,
              {endTime: 7, message: "Weby byly úspěšně uloženy."}
            )
          }
        })
      }
    })
  };

  initElm(rows) {
    let data = [].concat(rows);

    rows.forEach((row, i) => {
      data[i].name = row.name.decodeBase64();
      return data[i].description = row.description.decodeBase64()
    });

    let dataStr = JSON.stringify(data, null, 1);
    let template = `${`
<div class='text-center'>
  <div class='form-floating'>
    <textarea class='form-control' placeholder='Leave a comment here' id='floatingWebsitesTextarea' style='height: 300px'>${dataStr}</textarea>
    <label for='floatingWebsitesTextarea'>Editor</label>
  </div>
  <button class='btn btn-secondary mt-3 mb-5' id='adminBtnSaveWebsites' onclick='adminBtnSaveWebsites()'>Uložit</button>
</div>
    `}`;
    return this.innerHTML = template
  }
}