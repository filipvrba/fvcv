import 'ElmAdminImages', './elm_admin_images'
import 'ElmGallery', '../packages/gallery-rjs-0.1.0/elements/elm_gallery'

export default class ElmAdminImagesModal < ElmAdminImages
  def initialize
    super

    @h_reinit = lambda { |_| reinit() }

    @index_history = nil
  end

  def connected_callback()
    super

    Events.connect('#app', ElmAdminImages::ENVS::REINIT, @h_reinit)

    window.name_img_click = name_img_click
  end

  def disconnected_callback()
    Events.connect('#app', ElmAdminImages::ENVS::REINIT, @h_reinit)

    super
  end

  def name_img_click(id)
    @index_history = id
    image = @images.find(lambda { |row| row.id.to_i == id.to_i })
    card = {
      picture: image['image_base64'],
      name: image.name
    }
    Events.emit('#app', ElmGallery::ENVS::GALLERY_CLICK, card)
  end

  def init_elm()
    "data-bs-toggle='modal' data-bs-target='#galleryModal'"

    template = super.concat('<elm-gallery-modal></elm-gallery-modal>')
    self.innerHTML = template
  end

  def reinit()
    tr_images = document.query_selector_all('#trImage')
    tr_images.each do |tr_image|
      id = tr_image.query_selector('th').innerText.to_i
      td_name = tr_image.query_selector('td')
      td_name.innerHTML = "<a class='btn-img navbar-brand' " +
        "onclick='nameImgClick(#{id})' data-bs-toggle='modal' " +
        "data-bs-target='#galleryModal'>#{td_name.innerText}</a>"
    end
  end
end