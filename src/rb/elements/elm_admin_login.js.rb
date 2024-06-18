import 'CryptoJS', 'crypto-js'
import 'ElmAdmin', './elm_admin'

export default class ElmAdminLogin < HTMLElement
  ENVS = {
    login: 'al0',
    validation: 'al1',
  }

  def initialize
    super
    
    @h_admin_validation = lambda { |e| validation_admin_password(e.detail.value) }
    @h_input_password_btn = lambda { |_| input_password_btn() }

    init_elm()
    @input_password_dom = document.get_element_by_id('adminPassword')
    @input_password_dom.focus()

    window.admin_check_password = admin_check_password
    window.admin_password_input_change = admin_password_input_change
  end

  def connected_callback()
    Events.connect('#app', ElmAdminLogin::ENVS[:validation], @h_admin_validation)
    @input_password_dom.add_event_listener('keypress', @h_input_password_btn)
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmAdminLogin::ENVS[:validation], @h_admin_validation)
    @input_password_dom.remove_event_listener('keypress', @h_input_password_btn)
  end

  def input_password_btn()
    unless event.key === 'Enter'
      return
    end

    document.get_element_by_id('adminPasswordBtn').click()
  end

  def admin_check_password()
    plain_password  = @input_password_dom.value
    hashed_password = CryptoJS::MD5(plain_password).to_s

    query = "SELECT CASE WHEN password_hash = '#{hashed_password}' " +
            "THEN 'true' ELSE 'false' END AS token_status FROM users " +
            "WHERE id = #{ElmAdmin::LOGIN_ID};"
    __bef_db.get(query) do |rows|
      data = rows[0]
      is_correct = data['token_status'] == 'true'
      Events.emit('#app', ElmAdminLogin::ENVS[:login], is_correct)
    end
  end

  def admin_password_input_change()
    if @input_password_dom.class_list.contains('is-invalid')
      validation_admin_password(true)
    end
  end

  def validation_admin_password(is_valid)
    if is_valid
      @input_password_dom.class_list.remove('is-invalid')
    else
      @input_password_dom.class_list.add('is-invalid')
    end
  end

  def init_elm()
    template = """
<div id='adminPasswordForm' class='col-md-6 mx-auto text-center'>
  <input type='password' class='form-control' id='adminPassword' oninput='adminPasswordInputChange()' placeholder='Zadejte heslo' aria-describedby='validationAdminPasswordFeedback' required>
  <div id='validationAdminPasswordFeedback' class='invalid-feedback'>
    Při přihlášení jste zadali špatné heslo!
  </div>

  <button class='btn btn-secondary mt-3 mb-5' id='adminPasswordBtn' onclick='adminCheckPassword()'>Přihlásit se</button>
  <div class='alert alert-secondary mb-3' role='alert'>
    <em>Pro přístup k administraci tohoto webu je nutné se přihlásit. Po úspěšném přihlášení jako správce budete moci upravovat a spravovat obsah stránky.</em>
  </div>
</div>
    """

    self.innerHTML = template
  end
end