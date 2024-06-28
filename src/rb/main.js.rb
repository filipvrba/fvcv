import '../css/bootstrap.min.css'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'

import 'galleryObj', '../json/gallery.json'

import '../css/lazy_image.css'
import '../css/videos.css'
import '../css/gallery.css'
import '../css/style.css'

import './core'
import './third_side'
import './elements'

window.GITHUB_URL = {
  PROFILE: 'https://api.github.com/users/filipvrba',
  REPOS: 'https://api.github.com/users/filipvrba/repos?per_page=100',
  GISTS: 'https://api.github.com/users/filipvrba/gists',
}
window.GALLERY_JSON = {
  "gallery" => gallery_obj,
}

__bef_db.get("SELECT id, title, text FROM articles;") do |articles|
  articles.each do |article|
    title    = article.title.decode_base64()
    endpoint = Routes.get_endpoint_article(article.id, title)

    Routes.set_routes(endpoint, title)
    Routes.set_page_article(endpoint, title, article.text)
  end

  document.querySelector('#app').innerHTML = "<elm-priority-routes></elm-priority-routes>"
end
