import 'ElmAdmin', './elm_admin'

export default class ElmDetailedProjects < HTMLElement
  def initialize
    super

    self.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>"

    __bef_db.get("SELECT websites.name, websites.description, websites.url, " +
                 "images.image_base64 FROM websites LEFT JOIN images ON " +
                 "websites.image_id = images.id; WHERE website.user_id = #{ElmAdmin::LOGIN_ID}") do |rows|

      init_elm(rows)
    end
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm(rows)
    template = """
<div class='row'>
  #{subinit_elm(rows)}
</div>
    """

    self.innerHTML = template
  end

  def subinit_elm(rows)
    results = []

    rows.each do |row|
      img_src = row['image_base64'] == '' ? '/jpg/no_img_01.jpg' : row['image_base64']

      template = """
<div class='col-md-6 col-lg-4 mb-4'>
  <div class='card h-100'>
    <img src='#{img_src}' class='card-img-top' alt='Náhled webové stránky'>
    <div class='card-body d-flex flex-column'>
      <h5 class='card-title'>
        <i class='bi bi-file-earmark-text'></i>
        #{row.name.decode_base64()}
      </h5>
      <p class='card-text'>#{row.description.decode_base64()}</p>

      <div class='mt-auto text-center'>
        <a href='#{row.url}' target='_blank' class='btn btn-secondary card-text'>
          <i class='bi bi-eye'></i>
          Podívat se
        </a>
      </div>
    </div>
  </div>
</div>
      """
      results << template
    end

    return results.join('')
  end
end
