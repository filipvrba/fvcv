import "./packages/template-rjs-0.1.1/elements";
import "./packages/gallery-rjs-0.1.0/elements";
import ElmHeader from "./elements/elm_header";
window.customElements.define("elm-header", ElmHeader);
import ElmFooter from "./elements/elm_footer";
window.customElements.define("elm-footer", ElmFooter);
import ElmLazyImageTest from "./elements/elm_lazy_image_test";
window.customElements.define("elm-lazy-image-test", ElmLazyImageTest);
import ElmProjects from "./elements/elm_projects";
window.customElements.define("elm-projects", ElmProjects)