import 'ElmAdmin', './elm_admin'
import 'ElmAlert', './elm_alert'

export default class ElmAdminContacts < HTMLElement
  def initialize
    super
    
    self.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>"

    __bef_db.get("SELECT phone, email, facebook, reddit, linkedin, github, youtube " +
                 "FROM contacts WHERE user_id = #{ElmAdmin::LOGIN_ID};") do |rows|
      data = rows[0]
      init_elm(data)
    end

    window.admin_btn_save_contacts = admin_btn_save_contacts
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def admin_btn_save_contacts()
    phone_input    = document.get_element_by_id('phoneInput').value
    email_input    = document.get_element_by_id('emailInput').value
    facebook_input = document.get_element_by_id('facebookInput').value
    reddit_input   = document.get_element_by_id('redditInput').value
    linked_input   = document.get_element_by_id('linkedinInput').value
    github_input   = document.get_element_by_id('githubInput').value
    youtube_input  = document.get_element_by_id('youtubeInput').value

    __bef_db.set("UPDATE contacts SET phone = '#{phone_input}', " +
                 "email = '#{email_input}', facebook = '#{facebook_input}', " +
                 "reddit = '#{reddit_input}', linkedin = '#{linked_input}', " +
                 "github = '#{github_input}', youtube = '#{youtube_input}' " +
                 "WHERE user_id = #{ElmAdmin::LOGIN_ID};") do |is_save|
      if is_save
        Events.emit('#app', ElmAlert::ENVS::SHOW, {
          end_time: 7,
          message: "Kontakty byly úspěšně uloženy."
        })
      end
    end
  end

  def init_elm(db_contacts)
    template = """
<div class='text-center'>
  <div class='row'>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='phoneInput'><i class='bi bi-telephone-fill'></i> Telefonní číslo</label>
            <input type='tel' class='form-control mt-2' id='phoneInput' placeholder='Zadejte telefonní číslo' value='#{db_contacts.phone}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='emailInput'><i class='bi bi-envelope-fill'></i> Email</label>
            <input type='email' class='form-control mt-2' id='emailInput' placeholder='Zadejte email' value='#{db_contacts.email}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='facebookInput'><i class='bi bi-facebook'></i> Facebook</label>
            <input type='url' class='form-control mt-2' id='facebookInput' placeholder='Zadejte URL vašeho Facebook profilu' value='#{db_contacts.facebook}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='redditInput'><i class='bi bi-reddit'></i> Reddit</label>
            <input type='url' class='form-control mt-2' id='redditInput' placeholder='Zadejte URL vašeho Reddit profilu' value='#{db_contacts.reddit}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='linkedinInput'><i class='bi bi-linkedin'></i> LinkedIn</label>
            <input type='url' class='form-control mt-2' id='linkedinInput' placeholder='Zadejte URL vašeho LinkedIn profilu' value='#{db_contacts.linkedin}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='githubInput'><i class='bi bi-github'></i> GitHub</label>
            <input type='url' class='form-control mt-2' id='githubInput' placeholder='Zadejte URL vašeho GitHub profilu' value='#{db_contacts.github}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='youtubeInput'><i class='bi bi-youtube'></i> YouTube</label>
            <input type='url' class='form-control mt-2' id='youtubeInput' placeholder='Zadejte URL vašeho YouTube kanálu' value='#{db_contacts.youtube}'>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button class='btn btn-secondary mt-3 mb-5' id='adminBtnSaveContacts' onclick='adminBtnSaveContacts()'>Uložit</button>
</div>
    """

    self.innerHTML = template
  end
end