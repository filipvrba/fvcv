import CryptoJS from "crypto-js";
import ElmAdmin from "./elm_admin";

export default class ElmAdminLogin extends HTMLElement {
  constructor() {
    super();
    this._hAdminValidation = e => this.validationAdminPassword(e.detail.value);

    this._hInputPasswordBtn = (_) => {
      return this.inputPasswordBtn()
    };

    this.initElm();
    this._inputPasswordDom = document.getElementById("adminPassword");
    this._inputPasswordDom.focus();
    window.adminCheckPassword = this.adminCheckPassword.bind(this);
    window.adminPasswordInputChange = this.adminPasswordInputChange.bind(this)
  };

  connectedCallback() {
    Events.connect(
      "#app",
      ElmAdminLogin.ENVS.validation,
      this._hAdminValidation
    );

    return this._inputPasswordDom.addEventListener(
      "keypress",
      this._hInputPasswordBtn
    )
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      ElmAdminLogin.ENVS.validation,
      this._hAdminValidation
    );

    return this._inputPasswordDom.removeEventListener(
      "keypress",
      this._hInputPasswordBtn
    )
  };

  inputPasswordBtn() {
    if (event.key !== "Enter") return;
    return document.getElementById("adminPasswordBtn").click()
  };

  adminCheckPassword() {
    let plainPassword = this._inputPasswordDom.value;
    let hashedPassword = CryptoJS.MD5(plainPassword).toString();
    let query = `SELECT CASE WHEN password_hash = '${hashedPassword}' THEN 'true' ELSE 'false' END AS token_status FROM users WHERE id = ${ElmAdmin.LOGIN_ID};`;

    return _BefDb.get(query, (rows) => {
      let data = rows[0];
      let isCorrect = data.token_status === "true";
      return Events.emit("#app", ElmAdminLogin.ENVS.login, isCorrect)
    })
  };

  adminPasswordInputChange() {
    if (this._inputPasswordDom.classList.contains("is-invalid")) {
      return this.validationAdminPassword(true)
    }
  };

  validationAdminPassword(isValid) {
    return isValid ? this._inputPasswordDom.classList.remove("is-invalid") : this._inputPasswordDom.classList.add("is-invalid")
  };

  initElm() {
    let template = `${`
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
    `}`;
    return this.innerHTML = template
  }
};

ElmAdminLogin.ENVS = {login: "al0", validation: "al1"}