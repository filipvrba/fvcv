export default class ElmHeader extends HTMLElement {
  constructor() {
    super();
    this._title = document.title;
    this._sections = this.getAttribute("sections");
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
      <img src='/png/logo_pivnice-256x256.png' alt='${this._title}' style='height: 64px;'>
      ${this._title}
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