import ElmAdmin from "./elm_admin";

export default class ElmVideos extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>";

    _BefDb.get(
      `SELECT video_data FROM videos WHERE user_id = ${ElmAdmin.LOGIN_ID};`,

      (rows) => {
        let data = rows[0].video_data;
        let dataDecode = data.decodePrettyJson();
        this._dbVideos = JSON.parse(dataDecode);
        return this.initElm(this._dbVideos)
      }
    );

    window.videoTrClick = this.videoTrClick.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  videoTrClick(index) {
    if (this._dbVideos) {
      return window.open(this._dbVideos[index].url, "_blank").focus()
    }
  };

  initElm(videos) {
    let template = `${`
<table class='table table-striped'>
  <thead>
    <tr>
      <th scope='col'></th>
      <th scope='col'>Název</th>
      <th scope='col'>Kategorie</th>
    </tr>
  </thead>
  <tbody>
    ${this.subinitElm(videos)}
  </tbody>
</table>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(videos) {
    let elements = [];

    videos.forEach((video, i) => {
      let trDom = `${`
      <tr onclick='videoTrClick(${i})'>
        <th scope='row'>${i + 1}</th>
        <td>${video.name}</td>
        <td>${video.category}</td>
      </tr>
      `}`;
      return elements.push(trDom)
    });

    return elements.join("")
  }
}