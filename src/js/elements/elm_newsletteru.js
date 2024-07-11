import ElmAlert from "./elm_alert";

export default class ElmNewsletteru extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    this._email = this.querySelector("#emailNewsletteru");
    window.newsletteruBtnClick = this.newsletteruBtnClick.bind(this)
  };

  newsletteruBtnClick() {
    let isEmailCorrect = ElmNewsletteru.REG_EMAIL_VALIDATION.test(this._email.value);

    if (!isEmailCorrect) {
      this.validationEmail(false);
      return
    };

    let token = this._email.value.generateToken();
    this.addEmailToDb(this._email.value, token);
    localStorage.setItem("e_token", token);
    return this._email.value = ""
  };

  addEmailToDb(email, token) {
    let query = `INSERT INTO newsletter (email, token) VALUES ('${email}', '${token}');`;

    return _BefDb.set(query, false, isRegistered => (
      isRegistered ? Events.emit(
        "#app",
        ElmAlert.ENVS.SHOW,
        {endTime: 7, message: "Děkuji za přihlášení odběru newsletteru."}
      ) : Events.emit("#app", ElmAlert.ENVS.SHOW, {
        endTime: 7,
        message: "Zadaný e-mail je již přihlášen k odběru newsletteru."
      })
    ))
  };

  initElm() {
    let template = `${`
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
    `}`;
    return this.innerHTML = template
  };

  validationEmail(isValid) {
    return isValid ? this._email.classList.remove("is-invalid") : this._email.classList.add("is-invalid")
  }
};

ElmNewsletteru.REG_EMAIL_VALIDATION = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/m