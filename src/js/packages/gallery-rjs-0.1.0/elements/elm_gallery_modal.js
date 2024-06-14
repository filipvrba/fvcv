import ElmGallery from "./elm_gallery";

export default class ElmGalleryModal extends HTMLElement {
  constructor() {
    super();
    this._lGalleryClick = t => this.reinitElm(t.detail.value);
    this._lPopstate = e => this.popstate(e);
    this.initElm()
  };

  connectedCallback() {
    Events.connect(
      "#app",
      ElmGallery.ENVS.GALLERY_CLICK,
      this._lGalleryClick
    );

    return window.addEventListener("popstate", this._lPopstate)
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      ElmGallery.ENVS.GALLERY_CLICK,
      this._lGalleryClick
    );

    return window.removeEventListener("popstate", this._lPopstate)
  };

  popstate(event) {
    return Events.emit("#galleryModal", "modal.hide")
  };

  initElm() {
    let template = `${`
<div class='modal fade' id='galleryModal' tabindex='-1' role='dialog' aria-labelledby='galleryModalTitle' aria-hidden='true'>
  <div class='modal-dialog modal-lg modal-dialog-centered' role='document'>
    <div class='modal-content'>
      <div class='modal-header border-bottom-0'>
        <h1 id='modal-title' class='modal-title fs-5'></h1>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
      </div>
      <div class='modal-body'>        
        <img src='' id='modal-image' class='img-fluid'>
        <button class='carousel-control-prev' type='button' onclick='modalBtnPrevClick()'>
          <span class='carousel-control-prev-icon' aria-hidden='true'></span>
        </button>
        <button class='carousel-control-next' type='button' onclick='modalBtnNextClick()'>
          <span class='carousel-control-next-icon' aria-hidden='true'></span>
        </button>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  };

  reinitElm(card) {
    document.getElementById("modal-image").src = card.picture;
    return document.getElementById("modal-title").innerText = card.name
  }
}