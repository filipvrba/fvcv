export default class ElmRoutes < HTMLElement
  def initialize
    super

    @l_hashchange = lambda { change_page() }
    @title_app = document.title

    change_page()
  end

  def connectedCallback()
    window.add_event_listener('hashchange', @l_hashchange)
  end

  def disconnectedCallback()
    window.remove_event_listener('hashchange', @l_hashchange)
  end

  def change_page()
    current_page = find_current_page()
    init_page(current_page) if current_page
  end

  def find_current_page()
    ROUTES_JSON.pages.each do |page|
      unless page.endpoint == location.hash.sub('#', '')
                              .gsub('-', '/')
        next
      end

      return page
    end

    return nil
  end

  def init_page(page)
    init_meta(page)
    
    page_name = page.endpoint.gsub('-', '_')
    content = PAGES[page_name]
    init_elm(content, page)

    update_imgs()
  end

  def update_imgs()
    elm_imgs = self.query_selector_all('img')

    elm_imgs.each do |elm_img|
      src = elm_img.get_attribute('src')

      if src =~ /^(?!https?:\/\/|\/).*/
        Net.google_image(src) do |base64_image|
          elm_img.src = base64_image
        end
      end
    end
  end

  def init_elm(content, page = nil)
    template = """
    #{content.sub('TITLE', page.title) if page}
    """

    self.innerHTML = template
  end

  def init_meta(page)
    title = "#{page.title} | #{@title_app}"

    # Title
    document.title = title
  end
end
