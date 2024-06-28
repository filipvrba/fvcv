import "../css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import galleryObj from "../json/gallery.json";
import "../css/lazy_image.css";
import "../css/videos.css";
import "../css/gallery.css";
import "../css/style.css";
import "./core";
import "./third_side";
import "./elements";
import markdownit from "markdown-it";

window.GITHUB_URL = {
  PROFILE: "https://api.github.com/users/filipvrba",
  REPOS: "https://api.github.com/users/filipvrba/repos?per_page=100",
  GISTS: "https://api.github.com/users/filipvrba/gists"
};

window.GALLERY_JSON = {gallery: galleryObj};
let md = markdownit();

_BefDb.get("SELECT title, text FROM articles;", (articles) => {
  for (let article of articles) {
    let title = article.title.decodeBase64();

    let href = "#blog_" + title.removeDiacritics().toLowerCase().replaceAll(
      " ",
      "_"
    );

    let keyPage = href.replace("#", "");
    ROUTES_JSON.pages.push({title, endpoint: keyPage, priority: 1});
    PAGES[keyPage] = `${`
<div class='container mt-5'>
  <header class='text-center mb-4'>
    <h1>${title}</h1>
  </header>
  <div class='col-lg-8 mx-auto'>
    ${md.render(article.text.decodeBase64())}
  </div>
</div>
    `}`
  };

  return document.querySelector("#app").innerHTML = "<elm-priority-routes></elm-priority-routes>"
})