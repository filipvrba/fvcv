import "./packages/template-rjs-0.1.1/elements";
import "./packages/gallery-rjs-0.1.0/elements";
import ElmHeader from "./elements/elm_header";
window.customElements.define("elm-header", ElmHeader);
import ElmFooter from "./elements/elm_footer";
window.customElements.define("elm-footer", ElmFooter);
import ElmLazyImageTest from "./elements/elm_lazy_image_test";
window.customElements.define("elm-lazy-image-test", ElmLazyImageTest);
import ElmProjects from "./elements/elm_projects";
window.customElements.define("elm-projects", ElmProjects);
import ElmVideos from "./elements/elm_videos";
window.customElements.define("elm-videos", ElmVideos);
import ElmAdmin from "./elements/elm_admin";
window.customElements.define("elm-admin", ElmAdmin);
import ElmAdminLogin from "./elements/elm_admin_login";
window.customElements.define("elm-admin-login", ElmAdminLogin);
import ElmAdminDashboard from "./elements/elm_admin_dashboard";

window.customElements.define(
  "elm-admin-dashboard",
  ElmAdminDashboard
);

import ElmAdminProfile from "./elements/elm_admin_profile";
window.customElements.define("elm-admin-profile", ElmAdminProfile);
import ElmAlert from "./elements/elm_alert";
window.customElements.define("elm-alert", ElmAlert);
import ElmAdminVideos from "./elements/elm_admin_videos";
window.customElements.define("elm-admin-videos", ElmAdminVideos);
import ElmContacts from "./elements/elm_contacts";
window.customElements.define("elm-contacts", ElmContacts);
import ElmAdminContacts from "./elements/elm_admin_contacts";
window.customElements.define("elm-admin-contacts", ElmAdminContacts);
import ElmDetailedProjects from "./elements/elm_detailed_projects";

window.customElements.define(
  "elm-detailed-projects",
  ElmDetailedProjects
);

import ElmGithubProjects from "./elements/elm_github_projects";

window.customElements.define(
  "elm-github-projects",
  ElmGithubProjects
);

import ElmAdminImages from "./elements/elm_admin_images";
window.customElements.define("elm-admin-images", ElmAdminImages)