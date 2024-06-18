import CryptoJS from "crypto-js";
import ElmAdmin from "../../../elements/elm_admin";
import ElmAlert from "../../../elements/elm_alert";

export default class CPassworld {
  constructor() {
    this._adminInputPasswordNew = document.getElementById("adminPasswordNew");
    this._adminBtnSavePassword = document.getElementById("adminBtnSavePassword");
    this._adminInputPasswordNewRepeat = document.getElementById("adminPasswordNewRepeat");
    window.adminBtnSavePassword = this.adminBtnSavePassword.bind(this);
    window.adminPasswordNewInputChange = this.adminPasswordNewInputChange.bind(this);
    window.adminPasswordNewRepeatInputChange = this.adminPasswordNewRepeatInputChange.bind(this);
    this.adminPasswordNewInputChange()
  };

  adminPasswordNewInputChange() {
    return this._adminBtnSavePassword.disabled = this._adminInputPasswordNew.value.length === 0 || this._adminInputPasswordNewRepeat.value.length === 0
  };

  adminBtnSavePassword() {
    return this._adminInputPasswordNewRepeat.value === this._adminInputPasswordNew.value ? this.btnSuccessSavePassword(this._adminInputPasswordNew.value) : this._adminInputPasswordNewRepeat.classList.add("is-invalid")
  };

  adminPasswordNewRepeatInputChange() {
    this.adminPasswordNewInputChange();

    if (this._adminInputPasswordNewRepeat.classList.contains("is-invalid")) {
      return this._adminInputPasswordNewRepeat.classList.remove("is-invalid")
    }
  };

  btnSuccessSavePassword(newPassword) {
    let hashedPassword = CryptoJS.MD5(newPassword).toString();

    return _BefDb.set(
      `UPDATE users SET password_hash = '${hashedPassword}' WHERE id = ${ElmAdmin.LOGIN_ID};`,

      (isSave) => {
        if (isSave) {
          this._adminInputPasswordNew.value = "";
          this._adminInputPasswordNewRepeat.value = "";
          this.adminPasswordNewInputChange();

          return Events.emit(
            "#app",
            ElmAlert.ENVS.SHOW,
            {endTime: 7, message: "Profil byl úspěšně uložen."}
          )
        }
      }
    )
  }
}