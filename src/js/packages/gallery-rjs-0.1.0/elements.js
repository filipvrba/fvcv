import ElmLazyImage from "./elements/elm_lazy_image";
window.customElements.define("elm-lazy-image", ElmLazyImage);
import ElmGallery from "./elements/elm_gallery";
window.customElements.define("elm-gallery", ElmGallery);
import ElmGalleryPagination from "./elements/elm_gallery_pagination";

window.customElements.define(
  "elm-gallery-pagination",
  ElmGalleryPagination
);

import ElmGalleryModal from "./elements/elm_gallery_modal";
window.customElements.define("elm-gallery-modal", ElmGalleryModal)