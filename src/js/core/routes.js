import routesObj from "../../json/routes.json";
window.ROUTES_JSON = routesObj;
import errorHTML from "../../html/error.html?raw";
import uvodHTML from "../../html/uvod.html?raw";
import videaHTML from "../../html/videa.html?raw";
import adminHTML from "../../html/admin.html?raw";
import kontaktyHTML from "../../html/kontakty.html?raw";
import galerieHTML from "../../html/galerie.html?raw";

window.PAGES = {
  error: errorHTML,
  uvod: uvodHTML,
  videa: videaHTML,
  admin: adminHTML,
  kontakty: kontaktyHTML,
  galerie: galerieHTML
}