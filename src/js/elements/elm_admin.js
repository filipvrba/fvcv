import ElmAdminLogin from "./elm_admin_login";

export default class ElmAdmin extends HTMLElement {
  constructor() {
    super();
    this._hAdminLogin = e => this.adminLogin(e.detail.value);
    this.initElm()
  };

  connectedCallback() {
    return Events.connect(
      "#app",
      ElmAdminLogin.ENVS.login,
      this._hAdminLogin
    )
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmAdminLogin.ENVS.login,
      this._hAdminLogin
    )
  };

  adminLogin(isCorrect) {
    if (!isCorrect) {
      Events.emit("#app", ElmAdminLogin.ENVS.validation, isCorrect);
      return
    };

    Cookie.set("loggedIn", "true", 30);
    return this.initElm()
  };

  initElm() {
    let isLoggedIn = Cookie.get("loggedIn") === "true";
    let template = "<elm-admin-login></elm-admin-login>";

    if (isLoggedIn) {
      // Section as an attribute is positional.
      // If we want to edit its content, please look in the 'admin_sections.json' file.
      template = "<elm-admin-dashboard sections='chat images websites blog videos contacts profile'></elm-admin-dashboard>"
    };

    return this.innerHTML = template
  }
};

ElmAdmin.LOGIN_ID = 1