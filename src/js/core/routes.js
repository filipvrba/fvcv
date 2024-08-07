import ElmAdmin from "../elements/elm_admin";
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
import oMneHTML from "../../html/o_mne.html?raw";
import sluzbyHTML from "../../html/sluzby.html?raw";
import quake2HTML from "../../html/quake2.html?raw";
import newsletterHTML from "../../html/newsletter.html?raw";
import hryHTML from "../../html/hry.html?raw";

window.PAGES = {
  error: errorHTML,
  uvod: uvodHTML,
  videa: videaHTML,
  admin: adminHTML,
  kontakty: kontaktyHTML,
  galerie: galerieHTML,
  projekty: projektyHTML,
  blog: blogHTML,
  o_mne: oMneHTML,
  sluzby: sluzbyHTML,
  quake2: quake2HTML,
  newsletter: newsletterHTML,
  hry: hryHTML
};

class Routes {
  static setPageArticle(options) {
    let text = options.text.decodeBase64().toMd().subNewsletter("elm-newsletter-article");
    return PAGES[options.page] = `${`
    <div class='container mt-5 article'>
      <header class='text-center mb-4'>
        <h1>${options.title}</h1>
        <p class='text-muted'>Datum: ${options.date}</p>
      </header>
      <div class='mx-auto'>
        ${text}
      </div>
    </div>
    `}`
  };

  static setRoutes(page, title) {
    page = {title, endpoint: page, priority: 2};
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
    ).replaceAll(/[-|&]/g, "_").replaceAll("___", "_")
  };

  static updatePageArticles(callback) {
    let query = `SELECT id, title, text, created_at FROM articles WHERE user_id = ${ElmAdmin.LOGIN_ID};`;

    return _BefDb.get(query, (articles) => {
      for (let article of articles) {
        let title = article.title.decodeBase64();
        let endpoint = Routes.getEndpointArticle(article.id, title);
        Routes.setRoutes(endpoint, title);

        let options = {
          page: endpoint,
          title,
          text: article.text,
          date: article.created_at.toDate()
        };

        Routes.setPageArticle(options)
      };

      if (callback) return callback()
    })
  }
};

window.Routes = Routes