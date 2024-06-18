import ElmAdmin from "./elm_admin";
import ElmAlert from "./elm_alert";

export default class ElmAdminContacts extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>";

    _BefDb.get(
      `SELECT phone, email, facebook, reddit, linkedin, github, youtube FROM contacts WHERE user_id = ${ElmAdmin.LOGIN_ID};`,

      (rows) => {
        let data = rows[0];
        return this.initElm(data)
      }
    );

    window.adminBtnSaveContacts = this.adminBtnSaveContacts.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  adminBtnSaveContacts() {
    let phoneInput = document.getElementById("phoneInput").value;
    let emailInput = document.getElementById("emailInput").value;
    let facebookInput = document.getElementById("facebookInput").value;
    let redditInput = document.getElementById("redditInput").value;
    let linkedInput = document.getElementById("linkedinInput").value;
    let githubInput = document.getElementById("githubInput").value;
    let youtubeInput = document.getElementById("youtubeInput").value;

    return _BefDb.set(
      `UPDATE contacts SET phone = '${phoneInput}', email = '${emailInput}', facebook = '${facebookInput}', reddit = '${redditInput}', linkedin = '${linkedInput}', github = '${githubInput}', youtube = '${youtubeInput}' WHERE user_id = ${ElmAdmin.LOGIN_ID};`,

      (isSave) => {
        if (isSave) {
          return Events.emit(
            "#app",
            ElmAlert.ENVS.SHOW,
            {endTime: 7, message: "Kontakty byly úspěšně uloženy."}
          )
        }
      }
    )
  };

  initElm(dbContacts) {
    let template = `${`
<div class='text-center'>
  <div class='row'>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='phoneInput'><i class='bi bi-telephone-fill'></i> Telefonní číslo</label>
            <input type='tel' class='form-control mt-2' id='phoneInput' placeholder='Zadejte telefonní číslo' value='${dbContacts.phone}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='emailInput'><i class='bi bi-envelope-fill'></i> Email</label>
            <input type='email' class='form-control mt-2' id='emailInput' placeholder='Zadejte email' value='${dbContacts.email}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='facebookInput'><i class='bi bi-facebook'></i> Facebook</label>
            <input type='url' class='form-control mt-2' id='facebookInput' placeholder='Zadejte URL vašeho Facebook profilu' value='${dbContacts.facebook}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='redditInput'><i class='bi bi-reddit'></i> Reddit</label>
            <input type='url' class='form-control mt-2' id='redditInput' placeholder='Zadejte URL vašeho Reddit profilu' value='${dbContacts.reddit}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='linkedinInput'><i class='bi bi-linkedin'></i> LinkedIn</label>
            <input type='url' class='form-control mt-2' id='linkedinInput' placeholder='Zadejte URL vašeho LinkedIn profilu' value='${dbContacts.linkedin}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='githubInput'><i class='bi bi-github'></i> GitHub</label>
            <input type='url' class='form-control mt-2' id='githubInput' placeholder='Zadejte URL vašeho GitHub profilu' value='${dbContacts.github}'>
          </div>
        </div>
      </div>
    </div>
    <div class='col-md-6 mb-4'>
      <div class='card'>
        <div class='card-body'>
          <div class='form-group'>
            <label for='youtubeInput'><i class='bi bi-youtube'></i> YouTube</label>
            <input type='url' class='form-control mt-2' id='youtubeInput' placeholder='Zadejte URL vašeho YouTube kanálu' value='${dbContacts.youtube}'>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button class='btn btn-secondary mt-3 mb-5' id='adminBtnSaveContacts' onclick='adminBtnSaveContacts()'>Uložit</button>
</div>
    `}`;
    return this.innerHTML = template
  }
}