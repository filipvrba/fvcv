import "../css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import "../../node_modules/highlight.js/styles/vs.css";
import galleryObj from "../json/gallery.json";
import "../css/lazy_image.css";
import "../css/videos.css";
import "../css/gallery.css";
import "../css/article.css";
import "../css/spinner.css";
import "../css/chat.css";
import "../css/style.css";
import "./core";
import "./third_side";
import "./elements";
import ElmAdmin from "./elements/elm_admin";

window.GITHUB_URL = {
  PROFILE: "https://api.github.com/users/filipvrba",
  REPOS: "https://api.github.com/users/filipvrba/repos?per_page=100",
  GISTS: "https://api.github.com/users/filipvrba/gists"
};

window.GALLERY_JSON = {gallery: galleryObj};
let query = `SELECT id, title, text, created_at FROM articles WHERE user_id = ${ElmAdmin.LOGIN_ID};`;

_BefDb.get(query, (articles) => {
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

  return document.querySelector("#app").innerHTML = "<elm-priority-routes></elm-priority-routes>"
})