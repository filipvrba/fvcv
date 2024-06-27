import 'routesObj', '../../json/routes.json'

window.ROUTES_JSON = routes_obj

import 'errorHTML', '../../html/error.html?raw'
import 'uvodHTML', '../../html/uvod.html?raw'
import 'videaHTML', '../../html/videa.html?raw'
import 'adminHTML', '../../html/admin.html?raw'
import 'kontaktyHTML', '../../html/kontakty.html?raw'
import 'galerieHTML', '../../html/galerie.html?raw'
import 'projektyHTML', '../../html/projekty.html?raw'
import 'blogHTML', '../../html/blog.html?raw'

window.PAGES = {
  error: errorHTML,
  uvod: uvodHTML,
  videa: videaHTML,
  admin: adminHTML,
  kontakty: kontaktyHTML,
  galerie: galerieHTML,
  projekty: projektyHTML,
  blog: blogHTML,
}
