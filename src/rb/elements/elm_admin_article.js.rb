import 'ElmAdmin', './elm_admin'
import 'ElmAlert', './elm_alert'

export default class ElmAdminArticle < HTMLElement
  def initialize
    super

    @id = self.get_attribute('id')

    window.admin_btn_back_article = admin_btn_back_article_click
    window.admin_btn_save_article = admin_btn_save_article_click
  end

  def connected_callback()
    self.innerHTML = init_elm()

    @image_id = self.query_selector('#inputArticleIDImage')
    @category = self.query_selector('#inputArticleCategory')
    @title    = self.query_selector('#inputArticleTitle')
    @text     = self.query_selector('#inputArticleText')
    @btn_save = self.query_selector('#adminBtnSaveArticle')

    init_elm_values(@id)
  end

  def disconnected_callback()
  end

  def admin_btn_back_article_click()
    self.innerHTML = "<elm-admin-blog></elm-admin-blog>"
  end

  def admin_btn_save_article_click()
    image_id = @image_id.value
    category = @category.value.encode_base64()
    title    = @title.value.encode_base64()
    text     = @text.value.encode_base64()

    unless @id
      __bef_db.set("INSERT INTO articles (user_id, image_id, title, text, category) " +
                "VALUES (#{ElmAdmin::LOGIN_ID}, #{image_id}, '#{title}', " +
                "'#{text}', '#{category}');") do |is_save|
        if is_save
          admin_btn_back_article_click()
          Events.emit('#app', ElmAlert::ENVS::SHOW, {
            end_time: 7,
            message: "Článek byl úspěšně přidán."
          })
        end
      end
    else
      __bef_db.set("UPDATE articles SET image_id = #{image_id}, " +
                   "title = '#{title}', text = '#{text}', " +
                   "category = '#{category}', updated_at = CURRENT_TIMESTAMP " +
                   "WHERE id = #{@id} AND user_id = #{ElmAdmin::LOGIN_ID}") do |is_updated|
        if is_updated
          admin_btn_back_article_click()
          Events.emit('#app', ElmAlert::ENVS::SHOW, {
            end_time: 7,
            message: "Článek byl úspěšně uložen."
          })
        end
      end
    end
  end

  def init_elm()
    template = """
<div class='row g-3'>
  <div class='col-md-6'>
    <div class='mb-3'>
      <label for='inputArticleIDImage' class='form-label'>ID Obrázku</label>
      <input type='number' class='form-control' id='inputArticleIDImage' min='0' value='0'>
    </div>
  </div>

  <div class='col-md-6'>
    <div class='mb-3'>
      <label for='inputArticleCategory' class='form-label'>Kategorie</label>
      <input type='text' class='form-control' id='inputArticleCategory'>
    </div>
  </div>
</div>
<div class='mb-4'>
  <div class='mb-3'>
    <label for='inputArticleTitle' class='form-label'>Název</label>
    <input type='text' class='form-control' id='inputArticleTitle'>
  </div>

  <div class='mb-3'>
    <div class='row'>
      <div class='col-6'>
        <label for='inputArticleText' class='form-label'>Text</label>
      </div>
      <div class='col-6 text-end'>
        <a class='navbar-brand' href='https://www.markdownguide.org/cheat-sheet/' target='_bland'>
          <i class='bi bi-info-circle'></i>
          MD Cheat Sheet
        </a>
      </div>
    </div>
    <textarea type='text' class='form-control' id='inputArticleText' style='height: 300px'></textarea>
  </div>
</div>
<div class='text-center'>
  <button class='btn btn-success' id='adminBtnSaveArticle' onclick='adminBtnSaveArticle()'>Uložit</button>
  <button class='btn btn-secondary' id='adminBtnBackArticle' onclick='adminBtnBackArticle()'>Zpět</button>
</div>
    """

    return template
  end

  def init_elm_values(id)
    unless id
      return
    end

    set_activity(true)

    __bef_db.get("SELECT image_id, title, text, category FROM articles " +
                 "WHERE user_id = #{ElmAdmin::LOGIN_ID} AND id = #{id};") do |articles|
      article = articles[0]
      set_activity(false)

      @image_id.value = article['image_id']
      @category.value = article.category.decode_base64()
      @title.value = article.title.decode_base64()
      @text.value = article.text.decode_base64()
    end
  end

  def set_activity(is_disabled)
    @image_id.disabled = is_disabled
    @category.disabled = is_disabled
    @title.disabled    = is_disabled
    @text.disabled     = is_disabled
    @btn_save.disabled = is_disabled
  end
end