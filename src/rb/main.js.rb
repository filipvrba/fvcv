import '../css/bootstrap.min.css'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import '../../node_modules/highlight.js/styles/vs.css'

import 'galleryObj', '../json/gallery.json'
import 'quakeGalleryObj', '../json/quake_gallery.json'

import '../css/lazy_image.css'
import '../css/videos.css'
import '../css/gallery.css'
import '../css/article.css'
import '../css/spinner.css'
import '../css/chat.css'
import '../css/elm-quake2-achievements.css'
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
  "quake2" => quakeGalleryObj, 
}

Routes.update_page_articles() do
  document.querySelector('#app').innerHTML = "<elm-priority-routes></elm-priority-routes>"
end

Net.curl('/api/render-image?file-id=11KYh2uzMWPPsF-rAjUWXSVi3rcQ0Wzg3') do |response|
  puts response
end