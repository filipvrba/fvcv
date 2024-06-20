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

window.GITHUB_URL = {
  PROFILE: "https://api.github.com/users/filipvrba",
  REPOS: "https://api.github.com/users/filipvrba/repos?per_page=100",
  GISTS: "https://api.github.com/users/filipvrba/gists"
};

window.GALLERY_JSON = {gallery: galleryObj};
document.querySelector("#app").innerHTML = "<elm-priority-routes></elm-priority-routes>"