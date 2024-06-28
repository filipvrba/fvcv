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

class Routes
  def self.set_page_article(options)
    PAGES[options.page] = """
    <div class='container mt-5 article'>
      <header class='text-center mb-4'>
        <h1>#{options.title}</h1>
        <p class='text-muted'>Datum: #{options.date}</p>
      </header>
      <div class='mx-auto'>
        #{options.text.decode_base64().to_md()}
      </div>
    </div>
    """
  end

  def self.set_routes(page, title)
    page = {
      "title": title,
      "endpoint": page,
      "priority": 1
    }
    is_exist = ROUTES_JSON.pages.some do |obj|
      obj.endpoint == page.endpoint
    end

    unless is_exist
      ROUTES_JSON.pages.push(page)
    end
  end

  def self.remove_page_article(endpoint)
    delete PAGES[endpoint]
  end

  def self.remove_articles_routes(ids, &callback)
    ids.each do |id|
      index = ROUTES_JSON.pages.find_index do |obj|
        obj.endpoint.match(/blog_#{id}/)
      end

      if index > -1
        callback(ROUTES_JSON.pages[index].endpoint) if callback
        ROUTES_JSON.pages.splice(index, 1)
      end
    end
  end

  def self.get_endpoint_article(id, title)
    "blog_#{id}_" + title.remove_diacritics().downcase()
      .gsub(' ', '_').gsub(/[-|&]/, '_').gsub('___', '_')
  end
end
window.Routes = Routes