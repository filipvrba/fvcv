import 'ElmAlert', './elm_alert'

export default class ElmNewsletteru < HTMLElement
  REG_EMAIL_VALIDATION = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  def initialize
    super
    
    init_elm()

    @email = self.query_selector('#emailNewsletteru')

    window.newsletteru_btn_click = newsletteru_btn_click
  end

  def newsletteru_btn_click()
    is_email_correct = REG_EMAIL_VALIDATION.test(@email.value)
    unless is_email_correct
      validation_email(false)
      return
    end

    token = @email.value.generate_token()
    add_email_to_db(@email.value, token)
    local_storage.set_item('e_token', token)
    
    @email.value = ''
  end

  def add_email_to_db(email, token)
    query = "INSERT INTO newsletter (email, token) " +
            "VALUES ('#{email}', '#{token}');"

    __bef_db.set(query, false) do |is_registered|
      if is_registered
        Events.emit('#app', ElmAlert::ENVS::SHOW, {
          end_time: 7,
          message: "Děkuji za přihlášení odběru newsletteru."
        })
      else
        Events.emit('#app', ElmAlert::ENVS::SHOW, {
          end_time: 7,
          message: "Zadaný e-mail je již přihlášen k odběru newsletteru."
        })
      end
    end
  end

  def init_elm()
    template = """
<div class='row justify-content-center'>
    <div class='col-lg-8'>
        <div class='card'>
            <div class='card-body'>
                <div>
                    <label for='emailNewsletteru' class='form-label'>Email</label>
                    <div class='input-group'>
                      <span class='input-group-text'><i class='bi bi-envelope-fill'></i></span>
                      <input type='email' class='form-control' id='emailNewsletteru' placeholder='Váš email' aria-describedby='validationEmailFeedback' required>
                      <div id='validationEmailFeedback' class='invalid-feedback'>
                        Zadejte prosím platnou emailovou adresu.
                    </div>
                </div>
                <div class='d-grid mt-3'>
                    <button class='btn btn-secondary' onclick='newsletteruBtnClick()'><i class='bi bi-envelope-paper'></i> Přihlásit se</button>
                </div>
            </div>
        </div>
    </div>
</div>
    """

    self.innerHTML = template
  end

  def validation_email(is_valid)
    if is_valid
      @email.class_list.remove('is-invalid')
    else
      @email.class_list.add('is-invalid')
    end
  end
end