import 'ElmGalleryModal', './elm_gallery_modal'

export default class ElmGallery < HTMLElement
  ENVS = {
    GALLERY_CLICK: 'g0'
  }

  def initialize
    super
    
    @gallery_index_history = nil
    @name = self.get_attribute('name')

    window.gallery_click = gallery_click
    window.modal_btn_prev_click = modal_btn_prev_click
    window.modal_btn_next_click = modal_btn_next_click
  end

  def gallery_click(index)
    @gallery_index_history = index
    card = relevant_gallery.gallery[index]
    Events.emit('#app', ElmGallery::ENVS::GALLERY_CLICK, card)
  end

  def connected_callback()
    init_elm()
  end

  def relevant_gallery
    GALLERY_JSON[@name]
  end

  def modal_btn_prev_click()
    index = @gallery_index_history <= 0 ?
      (relevant_gallery.gallery.length - 1) :
      (@gallery_index_history - 1)
    gallery_click(index)
  end

  def modal_btn_next_click()
    index = (@gallery_index_history + 1) % relevant_gallery.gallery.length
    gallery_click(index)
  end

  def init_elm()
    template = """
<div class='container'>
  <div class='row vertical-center'>
    #{subinit_elm()}
  </div>
</div>
    """

    self.innerHTML = template
  end

  def subinit_elm()
    cards = []
    relevant_gallery.gallery.each_with_index do |card, i|
      card_template = """
<div class='col-4 mb-4'>
<elm-lazy-image src='#{card.picture}' class='btn-img d-block mx-auto' onclick='galleryClick(#{i})' style='border-radius: 0.375rem' alt='#{card.name}' data-bs-toggle='modal' data-bs-target='#galleryModal'></elm-lazy-image>
</div>
      """

      cards.push(card_template)
    end

    cards.join('')
  end
end