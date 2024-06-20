export default class ElmHeader extends HTMLElement {
  constructor() {
    super();
    window.TITLE_APP = document.title.split("-")[0].trim();
    this._sections = this.getAttribute("sections");
    this._logo = this.getAttribute("logo");
    this.initElm();
    window.headerHide = this.hide.bind(this)
  };

  hide() {
    return Events.emit("#navbarSupportedContent", "collapse.hide")
  };

  initElm() {
    let template = `${`
<nav class='navbar navbar-expand-lg'>
  <div class='container'>
    <a class='navbar-brand' href='#' onclick='headerHide()'>
      <img class='img-radius' src='${this._logo}' alt='${TITLE_APP}' style='height: 64px;'>
      ${TITLE_APP}
    </a>
    <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
      <span class='navbar-toggler-icon'></span>
    </button>

    <div class='collapse navbar-collapse' id='navbarSupportedContent'>
      <ul class='navbar-nav ml-auto'>
        ${this.sectionsElements(this._sections)}
      </ul>
    </div>
  </div>
</nav>
    `}`;
    return this.innerHTML = template
  };

  sectionsElements(sections) {
    let aSections = [];

    for (let section of sections.trim().split(" ")) {
      let href = "#" + section.removeDiacritics().toLowerCase().replaceAll(
        "-",
        "_"
      );

      let name = section.replaceAll(/[-_]/g, " ").capitalize();
      let dom = `${`
      <li class='nav-item'>
        <a class='nav-link' href='${href}' onclick='headerHide()'>${name}</a>
      </li>
      `}`;
      aSections.push(dom)
    };

    return aSections.join("")
  }
}