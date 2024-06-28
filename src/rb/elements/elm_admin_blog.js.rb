import 'ElmAdmin', './elm_admin'
import 'ElmAlert', './elm_alert'

export default class ElmAdminBlog < HTMLElement
  def initialize
    super
  end

  def connected_callback()
    self.innerHTML = init_elm()
    @spinner        = self.query_selector('#spinnerBlog')
    @articles_tbody = self.query_selector('#articlesTBody')

    window.a_article_title_click = a_article_title_click
    window.dn_btn_article_new    = dn_btn_article_new_click
    window.dn_btn_article_remove = dn_btn_article_remove_click

    reinit_from_db()
  end

  def disconnected_callback()
  end

  def dn_btn_article_new_click()
    self.innerHTML = "<elm-admin-article></elm-admin-article>"
  end

  def dn_btn_article_remove_click()
    # Find selected ids
    tr_articles = @articles_tbody.query_selector_all('tr')
    ids         = []

    tr_articles.each do |tr_article|
      input_elm = tr_article.query_selector('input')
      if input_elm.checked
        id = input_elm.id.sub('checkArticle', '')
        ids.push(id)
      end
    end

    # Routes
    remove_routes(ids)

    # Remove ids
    if ids.length > 0
      query = "DELETE FROM articles WHERE id IN (#{ids.join(', ')});"
      __bef_db.set(query) do |is_deleted|
        if is_deleted
          reinit_from_db()
          Events.emit('#app', ElmAlert::ENVS::SHOW, {
            end_time: 7,
            message: "Článek byl úspěšně odebrán."
          })
        end
      end
    end
  end

  def a_article_title_click(id)
    self.innerHTML = "<elm-admin-article id='#{id}'></elm-admin-article>"
  end

  def spinner_display(is_active)
    if is_active
      @spinner.style.display = ''
    else
      @spinner.style.display = :none
    end
  end

  def reinit_from_db()
    spinner_display(true)
    __bef_db.get("SELECT id, image_id, title, text, category FROM articles " +
                 "WHERE user_id = #{ElmAdmin::LOGIN_ID};") do |articles|
      spinner_display(false)
      subinit_elm(articles)
      add_routes(articles)
    end
  end

  def add_routes(articles)
    articles.each do |article|
      title = article.title.decode_base64()
      endpoint = Routes.get_endpoint_article(article.id, title)

      Routes.set_routes(endpoint, title)
      Routes.set_page_article(endpoint, title, article.text)
    end
  end

  def remove_routes(ids)
    Routes.remove_articles_routes(ids) do |endpoint|
      Routes.remove_page_article(endpoint)
    end
  end

  def init_elm()
    template = """
<table class='table' id='tableArticles'>
  <thead>
    <tr>
      <th scope='col'></th>
      <th scope='col'>Název</th>
      <th scope='col'>Kategorie</th>
      <th scope='col' class='text-end'>
        <div class='dropdown'>
          <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
            <i class='bi bi-gear'></i>
            Akce
          </button>
          <ul class='dropdown-menu'>
            <li>
              <button id='dnBtnArticleNew' class='dropdown-item' onclick='dnBtnArticleNew()'>Nový</button>
            </li>
            <li>
              <button id='dnBtnArticleRemove' class='dropdown-item' onclick='dnBtnArticleRemove()'>Odebrat</button>
            </li>
          </ul>
        </div>
      </th>
    </tr>
  </thead>
  <tbody id='articlesTBody'>
    
  </tbody>
  
</table>
<div id='spinnerBlog'>
  <elm-spinner class='text-center mt-5 mb-5'></elm-spinner>
</div>
    """
  end

  def subinit_elm(articles)
    trs_result = []
    
    articles.each do |article|
      template = """
<tr id='trArticle'>
  <th scope='row'>#{article.id}</th>
  <td>
    <a class='btn-img navbar-brand' onclick='aArticleTitleClick(#{article.id})'>#{article.title.decode_base64()}</a>
  </td>
  <td>#{article.category.decode_base64()}</td>
  <td>
    <div class='d-flex justify-content-center mb-3 form-check'>
      <input type='checkbox' class='form-check-input' id='checkArticle#{article.id}'>
      <label class='form-check-label' for='checkArticle#{article.id}'></label>
    </div>
  </td>
</tr>
      """

      trs_result.push(template)
    end

    @articles_tbody.innerHTML = trs_result.join('')
  end
end