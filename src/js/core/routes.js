import routesObj from "../../json/routes.json";
window.ROUTES_JSON = routesObj;
import errorHTML from "../../html/error.html?raw";
import uvodHTML from "../../html/uvod.html?raw";
import videaHTML from "../../html/videa.html?raw";
import adminHTML from "../../html/admin.html?raw";
import kontaktyHTML from "../../html/kontakty.html?raw";
import galerieHTML from "../../html/galerie.html?raw";
import projektyHTML from "../../html/projekty.html?raw";
import blogHTML from "../../html/blog.html?raw";

window.PAGES = {
  error: errorHTML,
  uvod: uvodHTML,
  videa: videaHTML,
  admin: adminHTML,
  kontakty: kontaktyHTML,
  galerie: galerieHTML,
  projekty: projektyHTML,
  blog: blogHTML
};

class Routes {
  static setPageArticle(page, title, text) {
    return PAGES[page] = `${`
    <div class='container mt-5'>
      <header class='text-center mb-4'>
        <h1>${title}</h1>
      </header>
      <div class='col-lg-8 mx-auto'>
        ${text.decodeBase64().toMd()}
      </div>
    </div>
    `}`
  };

  static setRoutes(page, title) {
    page = {title, endpoint: page, priority: 1};
    let isExist = ROUTES_JSON.pages.some(obj => obj.endpoint === page.endpoint);
    if (!isExist) return ROUTES_JSON.pages.push(page)
  };

  static removePageArticle(endpoint) {
    delete PAGES[endpoint]
  };

  static removeArticlesRoutes(ids, callback) {
    for (let id of ids) {
      let index = ROUTES_JSON.pages.findIndex(obj => (
        obj.endpoint.match(new RegExp(`blog_${id}`))
      ));

      if (index > -1) {
        if (callback) callback(ROUTES_JSON.pages[index].endpoint);
        ROUTES_JSON.pages.splice(index, 1)
      }
    }
  };

  static getEndpointArticle(id, title) {
    return `blog_${id}_` + title.removeDiacritics().toLowerCase().replaceAll(
      " ",
      "_"
    )
  }
};

window.Routes = Routes