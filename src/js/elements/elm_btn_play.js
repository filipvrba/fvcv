export default class ElmBtnPlay extends HTMLElement {
  constructor() {
    super();
    this._href = this.getAttribute("href");
    this.initElm()
  };

  initElm() {
    let eToken = localStorage.getItem("e_token");
    let href = `${this._href}?et=${eToken}`;
    let template = `${`
    <a href='${href}' class='btn btn-secondary rounded-pill mb-2'>
      <i class='bi bi-play-fill'></i>
      Hrát
    </a>
    `}`;
    return this.innerHTML = template
  }
}