export default class ElmLazyImageTest < HTMLElement
  def initialize
    super

    @h_load_large_image = lambda { @container.class_list.add('loaded') }
    
    src_split = self.get_attribute('src').split(' ')
    random_index = src_split.length.random_range()

    @src       = src_split[random_index]
    @src_small = @src.sub(/\..*$/, "-small$&")

    init_elm()

    @container = document.query_selector('.image-container')
    @large_image = document.query_selector('.large-image')
  end

  def connected_callback()
    @large_image.add_event_listener('load', @h_load_large_image)

    @large_image.src = @src
  end

  def disconnected_callback()
    @large_image.remove_event_listener('load', @h_load_large_image)
  end

  def init_elm()

    template = """
    <div class='image-container'>
      <img src='#{@src_small}' class='small-image'>
      <img src='' class='large-image'>
    </div>
    """

    self.innerHTML = template
  end
end