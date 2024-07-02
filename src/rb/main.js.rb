import '../css/bootstrap.min.css'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import '../../node_modules/highlight.js/styles/vs.css'

import 'galleryObj', '../json/gallery.json'

import '../css/lazy_image.css'
import '../css/videos.css'
import '../css/gallery.css'
import '../css/article.css'
import '../css/spinner.css'
import '../css/chat.css'
import '../css/style.css'

import './core'
import './third_side'
import './elements'

import 'ElmAdmin', './elements/elm_admin'

window.GITHUB_URL = {
  PROFILE: 'https://api.github.com/users/filipvrba',
  REPOS: 'https://api.github.com/users/filipvrba/repos?per_page=100',
  GISTS: 'https://api.github.com/users/filipvrba/gists',
}
window.GALLERY_JSON = {
  "gallery" => gallery_obj,
}

query = "SELECT id, title, text, created_at FROM articles " +
        "WHERE user_id = #{ElmAdmin::LOGIN_ID};"

__bef_db.get(query) do |articles|
  articles.each do |article|
    title    = article.title.decode_base64()
    endpoint = Routes.get_endpoint_article(article.id, title)

    Routes.set_routes(endpoint, title)
    options = {
      page: endpoint,
      title: title,
      text: article.text,
      date: article['created_at'].to_date(),
    }
    Routes.set_page_article(options)
  end

  document.querySelector('#app').innerHTML = "<elm-priority-routes></elm-priority-routes>"
end
