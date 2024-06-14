// https://blog.webdevsimplified.com/2023-05/lazy-load-images/
export default class ElmLazyImage extends HTMLElement {
  constructor() {
    super();

    this._lLoaded = () => {
      return this.loaded()
    };

    let uniq = Math.random().toString(16).slice(2);
    this._id = `blurred-img-${uniq}`;
    this._src = this.getAttribute("src");
    this._srcSmall = this._src.replace(/\..*$/m, "-small$&");
    this._alt = this.getAttribute("alt");
    this._style = this.getAttribute("style");
    this._class = this.getAttribute("class");
    this.initElm();
    this._blurredImageDiv = document.getElementById(this._id);
    this._img = this._blurredImageDiv.querySelector("img")
  };

  loaded() {
    return this._blurredImageDiv.classList.add("loaded")
  };

  connectedCallback() {
    return this._img.complete ? this._lLoaded() : this._img.addEventListener(
      "load",
      this._lLoaded
    )
  };

  disconnectedCallback() {
    return this._img.removeEventListener("load", this._lLoaded)
  };

  initElm() {
    let template = `${`
<div class='d-flex justify-content-center align-items-center'>
  <div id='${this._id}' class='blurred-img' style='background-image: url(${this._srcSmall}); ${this._style}'>
    <img src='${this._src}' loading='lazy' class='img-fluid ${this._class}' style='${this._style}' alt='${this._alt}' />
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}