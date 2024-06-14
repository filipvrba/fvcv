# https://blog.webdevsimplified.com/2023-05/lazy-load-images/

export default class ElmLazyImage < HTMLElement
  def initialize
    super

    @l_loaded = lambda { loaded() }
    
    uniq = Math.random().to_s(16).slice(2)
    @id  = "blurred-img-#{uniq}"

    @src       = self.get_attribute('src')
    @src_small = @src.sub(/\..*$/, "-small$&")
    @alt       = self.get_attribute('alt')
    @style     = self.get_attribute('style')
    @class     = self.get_attribute('class')

    init_elm()

    @blurred_image_div = document.get_element_by_id(@id)
    @img               = @blurred_image_div.query_selector("img")
  end

  def loaded()
    @blurred_image_div.class_list.add("loaded")
  end

  def connected_callback()
    if @img.complete
      @l_loaded.call()
    else
      @img.add_event_listener("load", @l_loaded)
    end
  end

  def disconnected_callback()
    @img.remove_event_listener("load", @l_loaded)
  end

  def init_elm()
    template = """
<div class='d-flex justify-content-center align-items-center'>
  <div id='#{@id}' class='blurred-img' style='background-image: url(#{ @src_small }); #{@style}'>
    <img src='#{@src}' loading='lazy' class='img-fluid #{@class}' style='#{@style}' alt='#{@alt}' />
  </div>
</div>
    """

    self.innerHTML = template
  end
end