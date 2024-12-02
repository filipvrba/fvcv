export default class ElmRoutes extends HTMLElement {
  constructor() {
    super();

    this._lHashchange = () => {
      return this.changePage()
    };

    this._titleApp = document.title;
    this.changePage()
  };

  connectedCallback() {
    return window.addEventListener("hashchange", this._lHashchange)
  };

  disconnectedCallback() {
    return window.removeEventListener("hashchange", this._lHashchange)
  };

  changePage() {
    let currentPage = this.findCurrentPage();
    if (currentPage) return this.initPage(currentPage)
  };

  findCurrentPage() {
    for (let page of ROUTES_JSON.pages) {
      if (page.endpoint !== location.hash.replace("#", "").replaceAll(
        "-",
        "/"
      )) continue;

      return page
    };

    return null
  };

  initPage(page) {
    this.initMeta(page);
    let pageName = page.endpoint.replaceAll("-", "_");
    let content = PAGES[pageName];
    this.initElm(content, page);
    return this.updateImgs()
  };

  updateImgs() {
    let elmImgs = this.querySelectorAll("img");

    for (let elmImg of elmImgs) {
      let src = elmImg.getAttribute("src");

      if (/^(?!https?:\/\/|\/).*/m.test(src)) {
        Net.googleImage(src, base64Image => elmImg.src = base64Image)
      }
    }
  };

  initElm(content, page=null) {
    let template = `${`\n    ${page ? content.replace(
      "TITLE",
      page.title
    ) : null}\n    `}`;

    return this.innerHTML = template
  };

  initMeta(page) {
    let title = `${page.title} | ${this._titleApp}`;
    return document.title = title
  }
}