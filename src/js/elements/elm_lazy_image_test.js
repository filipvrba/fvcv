export default class ElmLazyImageTest extends HTMLElement {
  constructor() {
    super();
    this._hLoadLargeImage = () => this._container.classList.add("loaded");
    let srcSplit = this.getAttribute("src").split(" ");
    let randomIndex = srcSplit.length.randomRange();
    this._src = srcSplit[randomIndex];
    this._srcSmall = this._src.replace(/\..*$/m, "-small$&");
    this.initElm();
    this._container = document.querySelector(".image-container");
    this._largeImage = document.querySelector(".large-image")
  };

  connectedCallback() {
    this._largeImage.addEventListener("load", this._hLoadLargeImage);
    return this._largeImage.src = this._src
  };

  disconnectedCallback() {
    return this._largeImage.removeEventListener(
      "load",
      this._hLoadLargeImage
    )
  };

  initElm() {
    let template = `${`
    <div class='image-container'>
      <img src='${this._srcSmall}' class='small-image'>
      <img src='' class='large-image'>
    </div>
    `}`;
    return this.innerHTML = template
  }
}