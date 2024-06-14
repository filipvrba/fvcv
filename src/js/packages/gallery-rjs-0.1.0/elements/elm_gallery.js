import ElmGalleryModal from "./elm_gallery_modal";

export default class ElmGallery extends HTMLElement {
  constructor() {
    super();
    this._galleryIndexHistory = null;
    this._name = this.getAttribute("name");
    window.galleryClick = this.galleryClick.bind(this);
    window.modalBtnPrevClick = this.modalBtnPrevClick.bind(this);
    window.modalBtnNextClick = this.modalBtnNextClick.bind(this)
  };

  galleryClick(index) {
    this._galleryIndexHistory = index;
    let card = this.relevantGallery.gallery[index];
    return Events.emit("#app", ElmGallery.ENVS.GALLERY_CLICK, card)
  };

  connectedCallback() {
    return this.initElm()
  };

  get relevantGallery() {
    return GALLERY_JSON[this._name]
  };

  modalBtnPrevClick() {
    let index = this._galleryIndexHistory <= 0 ? (() => {
      return this.relevantGallery.gallery.length - 1
    })() : (() => {
      return this._galleryIndexHistory - 1
    })();

    return this.galleryClick(index)
  };

  modalBtnNextClick() {
    let index = (this._galleryIndexHistory + 1) % this.relevantGallery.gallery.length;
    return this.galleryClick(index)
  };

  initElm() {
    let template = `${`
<div class='container'>
  <div class='row vertical-center'>
    ${this.subinitElm()}
  </div>
</div>
    `}`;
    return this.innerHTML = template
  };

  subinitElm() {
    let cards = [];

    this.relevantGallery.gallery.forEach((card, i) => {
      let cardTemplate = `${`
<div class='col-4 mb-4'>
<elm-lazy-image src='${card.picture}' class='btn-img d-block mx-auto' onclick='galleryClick(${i})' style='border-radius: 0.375rem' alt='${card.name}' data-bs-toggle='modal' data-bs-target='#galleryModal'></elm-lazy-image>
</div>
      `}`;
      return cards.push(cardTemplate)
    });

    return cards.join("")
  }
};

ElmGallery.ENVS = {GALLERY_CLICK: "g0"}