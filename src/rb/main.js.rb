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

import 'markdownit', 'markdown-it'

window.GITHUB_URL = {
  PROFILE: 'https://api.github.com/users/filipvrba',
  REPOS: 'https://api.github.com/users/filipvrba/repos?per_page=100',
  GISTS: 'https://api.github.com/users/filipvrba/gists',
}
window.GALLERY_JSON = {
  "gallery" => gallery_obj,
}
md = markdownit()

__bef_db.get("SELECT title, text FROM articles;") do |articles|

  articles.each do |article|
    title = article.title.decode_base64()

    href = "#blog_" + title.remove_diacritics().downcase().gsub(' ', '_')
    key_page = href.sub('#', '')
    ROUTES_JSON.pages << {
      "title": title,
      "endpoint": key_page,
      "priority": 1
    }
    PAGES[key_page] = """
<div class='container mt-5'>
  <header class='text-center mb-4'>
    <h1>#{title}</h1>
  </header>
  <div class='col-lg-8 mx-auto'>
    #{md.render(article.text.decode_base64())}
  </div>
</div>
    """
  end

  document.querySelector('#app').innerHTML = "<elm-priority-routes></elm-priority-routes>"
end
