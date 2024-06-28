import 'ElmAdmin', './elm_admin'

export default class ElmBlog < HTMLElement
  def initialize
    super
    
    self.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>"

    query = "SELECT articles.id, users.username, images.image_base64, articles.title, " +
            "articles.text, articles.category, articles.created_at FROM " +
            "articles JOIN users ON articles.user_id = users.id LEFT JOIN " +
            "images ON articles.image_id = images.id WHERE " +
            "articles.user_id = #{ElmAdmin::LOGIN_ID};"
    __bef_db.get(query) do |articles|

      init_elm(articles)
    end
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def update_routes(endpoint, title, text)
    Routes.set_routes(endpoint, title)
    Routes.set_page_article(endpoint, title, text)
  end

  def init_elm(articles)
    template = """
    <div class='row'>
      #{subinit_elm(articles)}
    </div>
    """

    self.innerHTML = template
  end

  def subinit_elm(articles)
    result = []
    articles.each do |article|
      title = article.title.decode_base64()
      endpoint = Routes.get_endpoint_article(article.id, title)

      # unsafe
      update_routes(endpoint, title, article.text)
      # end

      template = """
<div class='col-md-6 mb-4'>
  <div class='card h-100'>
    <img src='#{article['image_base64']}' class='card-img-top' alt='Náhled článku'>
    <div class='card-body d-flex flex-column'>
      <h5 class='card-title'>
        <i class='bi bi-folder'></i>
        #{title}
      </h5>
      <p class='card-text'>#{article.text.decode_base64().max_length(150)}</p>

      <div class='mt-auto'>
        <div class='row g-0 align-items-center'>
          <div class='col-6'>
            <p class='card-text'>
              <small class='text-muted'>
                <i class='bi bi-tag-fill'></i>
                #{article.category.decode_base64()}
              </small>
              <br>
              <small class='text-muted'>
                <i class='bi bi-calendar-fill'></i>
                #{article['created_at'].to_date()}
              </small>
            </p>
          </div>

          <div class='col-6 text-center'>
            <a href='##{endpoint}' class='btn btn-secondary card-text'>
              <i class='bi bi-eye'></i>
              Podívat se
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      """
      result << template
    end

    return result.reverse().join('')
  end
end
