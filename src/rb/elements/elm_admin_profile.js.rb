import 'CPassworld', '../components/elements/admin-profile/passworld'

export default class ElmAdminProfile < HTMLElement
  def initialize
    super
    
    init_elm()

    CPassworld.new
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<div id='adminPasswordForm' class='text-center'>
  <h2>Heslo</h2>

  <div class='accordion' id='accordionPassword'>
    <div class='accordion-item'>
      <h2 class='accordion-header'>
        <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapsePassword' aria-expanded='true' aria-controls='collapsePassword'>
          Změna na nové heslo
        </button>
      </h2>
      <div id='collapsePassword' class='accordion-collapse collapse' data-bs-parent='#accordionPassword'>
        <div class='accordion-body'>
          <input type='password' class='form-control' id='adminPasswordNew' oninput='adminPasswordNewInputChange()' placeholder='Zadejte nové heslo' aria-describedby='validationAdminPasswordFeedback' required>
          <div id='validationAdminPasswordFeedback' class='invalid-feedback'>
            Při přihlášení jste zadali špatné heslo!
          </div>
          <br>
          <input type='password' class='form-control' id='adminPasswordNewRepeat' oninput='adminPasswordNewRepeatInputChange()' placeholder='Zadejte znovu nové heslo' aria-describedby='validationAdminPasswordFeedback' required>
          <div id='validationAdminPasswordFeedback' class='invalid-feedback'>
            Heslo se neshoduje s tím, které bylo vyplněno jako první.
          </div>
        </div>
      </div>
    </div>
  </div>

  <button class='btn btn-secondary mt-3 mb-5' id='adminBtnSavePassword' onclick='adminBtnSavePassword()'>Uložit</button>
</div>
    """

    self.innerHTML = template
  end
end