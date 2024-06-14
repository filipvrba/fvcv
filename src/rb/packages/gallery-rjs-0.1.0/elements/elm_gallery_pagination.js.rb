import 'ElmGallery', './elm_gallery'

export default class ElmGalleryPagination < ElmGallery
  MAX_LENGTH = 6
  PARAMETER = "gallery-index"

  def initialize
    super
    @page_index = get_page_index()
    @name       = self.get_attribute('name')

    window.change_gallery = change_gallery
    window.scroll_gallery = scroll_gallery
  end

  def get_page_index()
    is_in_range = lambda do |number, min, max|
      return number >= min && number <= max
    end

    index = URLParams.get_index(PARAMETER)
    
    min_index = @page_index * MAX_LENGTH
    max_index = min_index + MAX_LENGTH

    if is_in_range(index, 0, pages_count)
      return index
    else
      return 0
    end
  end

  def connected_callback()
    super
  end

  def disconnected_callback()
  end

  def change_gallery(page_index)
    @page_index = page_index
    URLParams.set(PARAMETER, @page_index)

    init_elm()
  end

  def scroll_gallery(is_left)
    if is_left
      change_gallery(@page_index - 1) if @page_index - 1 >= 0
    else
      change_gallery(@page_index + 1) if @page_index + 1 < pages_count
    end
  end

  def gallery_json
    GALLERY_JSON[@name]
  end

  def pages_count
    Math.ceil(gallery_json.gallery.length / MAX_LENGTH)
  end

  def relevant_gallery
    result = { gallery: [] }

    min_index = @page_index * MAX_LENGTH
    max_index = min_index + MAX_LENGTH

    (min_index...max_index).each do |i|
      if i < gallery_json.gallery.length
        result.gallery << gallery_json.gallery[i]
      else
        break
      end
    end

    return result
  end

  def init_elm()
    super
  end

  def subinit_elm()
    l_btn_numbers = lambda do
      length = pages_count

      start_index = @page_index - 1
      if length > 2
        end_index = @page_index + 1
      else
        end_index = @page_index
      end

      if start_index < 0
        start_index += 1
        end_index += 1
      elsif end_index >= length
        start_index -= 1
        end_index -= 1
      end

      result = []

      (start_index..end_index).each do |i|
        is_active = i == @page_index ? "active" : ""
        template = """
<li class='page-item'>
  <button class='page-link #{is_active}' onclick='changeGallery(#{i})'>#{i + 1}</button>
</li>
        """
        result << template
      end

      return result.join('')
    end

    return """
#{super}
<nav aria-label='Page navigation example'>
  <ul class='pagination justify-content-center'>
    <li class='page-item'>
      <button class='page-link' onclick='scrollGallery(true)'>Předchozí</button>
    </li>
    #{l_btn_numbers()}
    <li class='page-item'>
      <button class='page-link' onclick='scrollGallery(false)'>Další</button>
    </li>
  </ul>
</nav>
    """
  end
end