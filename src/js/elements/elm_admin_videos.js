import ElmAdmin from "./elm_admin";
import ElmAlert from "./elm_alert";

export default class ElmAdminVideos extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>";

    _BefDb.get(
      `SELECT video_data FROM videos WHERE user_id = ${ElmAdmin.LOGIN_ID};`,

      (rows) => {
        let data = rows[0].video_data;
        let dataDecode = data.decodePrettyJson();
        return this.initElm(dataDecode)
      }
    );

    window.adminBtnSaveVideos = this.adminBtnSaveVideos.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  adminBtnSaveVideos() {
    let videoDataEncode = document.getElementById("floatingVideosTextarea").value.encodePrettyJson();

    return _BefDb.set(
      `UPDATE videos SET video_data = '${videoDataEncode}' WHERE user_id = ${ElmAdmin.LOGIN_ID};`,

      (isSave) => {
        if (isSave) {
          return Events.emit(
            "#app",
            ElmAlert.ENVS.SHOW,
            {endTime: 7, message: "Videa byla úspěšně uložena."}
          )
        }
      }
    )
  };

  initElm(data) {
    let template = `${`
<div class='text-center'>
  <div class='form-floating'>
    <textarea class='form-control' placeholder='Leave a comment here' id='floatingVideosTextarea' style='height: 300px'>${data}</textarea>
    <label for='floatingVideosTextarea'>Editor</label>
  </div>
  <button class='btn btn-secondary mt-3 mb-5' id='adminBtnSavePassword' onclick='adminBtnSaveVideos()'>Uložit</button>
</div>
    `}`;
    return this.innerHTML = template
  }
}