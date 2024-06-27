import ElmAdminImages from "./elm_admin_images";
import ElmGallery from "../packages/gallery-rjs-0.1.0/elements/elm_gallery";

export default class ElmAdminImagesModal extends ElmAdminImages {
  constructor() {
    super();

    this._hReinit = (_) => {
      return this.reinit()
    };

    this._indexHistory = null
  };

  connectedCallback() {
    super.connectedCallback();
    Events.connect("#app", ElmAdminImages.ENVS.REINIT, this._hReinit);
    return window.nameImgClick = this.nameImgClick.bind(this)
  };

  disconnectedCallback() {
    Events.connect("#app", ElmAdminImages.ENVS.REINIT, this._hReinit);
    return super.disconnectedCallback()
  };

  nameImgClick(id) {
    this._indexHistory = id;
    let image = this._images.find(row => parseInt(row.id) === parseInt(id));
    let card = {picture: image.image_base64, name: image.name};
    return Events.emit("#app", ElmGallery.ENVS.GALLERY_CLICK, card)
  };

  initElm() {
    "data-bs-toggle='modal' data-bs-target='#galleryModal'";
    let template = super.initElm().concat("<elm-gallery-modal></elm-gallery-modal>");
    return this.innerHTML = template
  };

  reinit() {
    let trImages = document.querySelectorAll("#trImage");

    for (let trImage of trImages) {
      let id = parseInt(trImage.querySelector("th").innerText);
      let tdName = trImage.querySelector("td");
      tdName.innerHTML = `<a class='btn-img navbar-brand' onclick='nameImgClick(${id})' data-bs-toggle='modal' data-bs-target='#galleryModal'>${tdName.innerText}</a>`
    }
  }
}