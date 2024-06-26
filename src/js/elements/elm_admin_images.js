import ElmAdmin from "./elm_admin";
import ElmAlert from "./elm_alert";

export default class ElmAdminImages extends HTMLElement {
  constructor() {
    super();
    this._hUploadFileInputChange = e => this.uploadFileInputChange(e);
    this.initElm();
    this._uploadFileInput = document.getElementById("uploadFileInput");
    this._spinner = document.getElementById("spinner");
    this._imagesTbody = document.getElementById("imagesTBody");
    this.reinitFromDb();
    window.dropdownBtnUploadClick = this.dropdownBtnUploadClick.bind(this);
    window.dropdownBtnRemoveClick = this.dropdownBtnRemoveClick.bind(this)
  };

  reinitFromDb() {
    this.spinnerDisplay(true);

    return _BefDb.get(
      `SELECT id, name, image_base64 FROM images WHERE user_id = ${ElmAdmin.LOGIN_ID};`,

      (rows) => {
        this.spinnerDisplay(false);
        return this.subinitElm(rows)
      }
    )
  };

  connectedCallback() {
    return this._uploadFileInput.addEventListener(
      "change",
      this._hUploadFileInputChange
    )
  };

  disconnectedCallback() {
    return this._uploadFileInput.removeEventListener(
      "change",
      this._hUploadFileInputChange
    )
  };

  dropdownBtnUploadClick() {
    return this._uploadFileInput.click()
  };

  dropdownBtnRemoveClick() {
    let query;
    let tableImages = document.getElementById("tableImages");
    let rows = tableImages.querySelectorAll("tr");
    let ids = [];

    rows.forEach((row, i) => {
      let id;
      if (i === 0) return;
      let inputElm = row.querySelector("input");

      if (inputElm.checked) {
        id = inputElm.id.replace("check", "");
        return ids.push(id)
      }
    });

    if (ids.length > 0) {
      query = `DELETE FROM images WHERE id IN (${ids.join(", ")});`;

      return _BefDb.set(query, (isDeleted) => {
        if (isDeleted) {
          this.reinitFromDb();

          return Events.emit(
            "#app",
            ElmAlert.ENVS.SHOW,
            {endTime: 7, message: "Obrázek byl úspěšně odebrán."}
          )
        }
      })
    }
  };

  uploadFileInputChange(event) {
    let file = event.target.files[0];
    let reader = new FileReader;
    reader.onload = e => this.uploadFileOnDb(file.name, e.target.result);
    return reader.readAsDataURL(file)
  };

  uploadFileOnDb(name, base64File) {
    return _BefDb.set(
      `INSERT INTO images (user_id, name, image_base64) VALUES (${ElmAdmin.LOGIN_ID}, '${name}', '${base64File}');`,

      (isUpload) => {
        if (isUpload) {
          this.reinitFromDb();

          return Events.emit(
            "#app",
            ElmAlert.ENVS.SHOW,
            {endTime: 7, message: "Obrázek byl úspěšně uložen."}
          )
        }
      }
    )
  };

  spinnerDisplay(isActive) {
    return isActive ? spinner.style.display = "" : spinner.style.display = "none"
  };

  initElm(rows) {
    let template = `${`
<input type='file' id='uploadFileInput' style='display: none;'>
<table class='table' id='tableImages'>
  <thead>
    <tr>
      <th scope='col'></th>
      <th scope='col'>Název</th>
      <th scope='col'>Velikost</th>
      <th scope='col' class='text-end'>
        <div class='dropdown'>
          <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
            <i class='bi bi-gear'></i>
            Akce
          </button>
          <ul class='dropdown-menu'>
            <li>
              <button class='dropdown-item' onclick='dropdownBtnUploadClick()'>Nahrát</button>
            </li>
            <li>
              <button class='dropdown-item' onclick='dropdownBtnRemoveClick()'>Odebrat</button>
            </li>
          </ul>
        </div>
      </th>
    </tr>
  </thead>
  <tbody id='imagesTBody'>
    
  </tbody>
  
</table>
<div id='spinner'>
  <elm-spinner class='text-center mt-5 mb-5'></elm-spinner>
</div>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(rows) {
    let trsResult = [];

    for (let row of rows) {
      let template = `${`
<tr>
  <th scope='row'>${row.id}</th>
  <td>${row.name}</td>
  <td>${row.image_base64.sizeInKb()} kB</td>
  <td>
    <div class='d-flex justify-content-center mb-3 form-check'>
      <input type='checkbox' class='form-check-input' id='check${row.id}'>
      <label class='form-check-label' for='check${row.id}'></label>
    </div>
  </td>
</tr>
      `}`;
      trsResult.push(template)
    };

    return this._imagesTbody.innerHTML = trsResult.join("")
  }
}