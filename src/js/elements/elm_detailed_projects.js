import ElmAdmin from "./elm_admin";

export default class ElmDetailedProjects extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>";

    _BefDb.get(
      `SELECT websites.name, websites.description, websites.url, images.image_base64 FROM websites JOIN images ON websites.image_id = images.id; WHERE website.user_id = ${ElmAdmin.LOGIN_ID}`,
      rows => this.initElm(rows)
    )
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm(rows) {
    let template = `${`\n<div class='row'>\n  ${this.subinitElm(rows)}\n</div>\n    `}`;
    return this.innerHTML = template
  };

  subinitElm(rows) {
    let results = [];

    for (let row of rows) {
      let template = `${`
<div class='col-md-6 mb-4'>
  <div class='card h-100'>
    <img src='${row.image_base64}' class='card-img-top' alt='Náhled webové stránky'>
    <div class='card-body d-flex flex-column'>
      <h5 class='card-title'>
        <i class='bi bi-file-earmark-text'></i>
        ${row.name.decodeBase64()}
      </h5>
      <p class='card-text'>${row.description.decodeBase64()}</p>

      <div class='mt-auto text-center'>
        <a href='${row.url}' target='_blank' class='btn btn-primary card-text'>
          <i class='bi bi-eye'></i>
          Podívat se
        </a>
      </div>
    </div>
  </div>
</div>
      `}`;
      results.push(template)
    };

    return results.join("")
  }
}