import ElmAdmin from "./elm_admin";
import ElmAlert from "./elm_alert";

export default class ElmAdminArticle extends HTMLElement {
  constructor() {
    super();
    this._id = this.getAttribute("id");
    window.adminBtnBackArticle = this.adminBtnBackArticleClick.bind(this);
    window.adminBtnSaveArticle = this.adminBtnSaveArticleClick.bind(this)
  };

  connectedCallback() {
    this.innerHTML = this.initElm();
    this._imageId = this.querySelector("#inputArticleIDImage");
    this._category = this.querySelector("#inputArticleCategory");
    this._title = this.querySelector("#inputArticleTitle");
    this._text = this.querySelector("#inputArticleText");
    this._btnSave = this.querySelector("#adminBtnSaveArticle");
    this._spinnerOverlay = this.querySelector("#spinnerOverlay");
    return this.initElmValues(this._id)
  };

  disconnectedCallback() {
    return null
  };

  adminBtnBackArticleClick() {
    return this.innerHTML = "<elm-admin-blog></elm-admin-blog>"
  };

  adminBtnSaveArticleClick() {
    let imageId = this._imageId.value;
    let category = this._category.value.encodeBase64();
    let title = this._title.value.encodeBase64();
    let text = this._text.value.encodeBase64();

    return this._id ? _BefDb.set(
      `UPDATE articles SET image_id = ${imageId}, title = '${title}', text = '${text}', category = '${category}', updated_at = CURRENT_TIMESTAMP WHERE id = ${this._id} AND user_id = ${ElmAdmin.LOGIN_ID}`,

      (isUpdated) => {
        if (isUpdated) {
          this.adminBtnBackArticleClick();

          return Events.emit(
            "#app",
            ElmAlert.ENVS.SHOW,
            {endTime: 7, message: "Článek byl úspěšně uložen."}
          )
        }
      }
    ) : _BefDb.set(
      `INSERT INTO articles (user_id, image_id, title, text, category) VALUES (${ElmAdmin.LOGIN_ID}, ${imageId}, '${title}', '${text}', '${category}');`,

      (isSave) => {
        if (isSave) {
          this.adminBtnBackArticleClick();

          return Events.emit(
            "#app",
            ElmAlert.ENVS.SHOW,
            {endTime: 7, message: "Článek byl úspěšně přidán."}
          )
        }
      }
    )
  };

  initElm() {
    let template = `${`
<div class='form-container'>
  <elm-spinner class='spinner-overlay' id='spinnerOverlay'></elm-spinner>

  <div class='row g-3'>
    <div class='col-md-6'>
      <div class='mb-3'>
        <label for='inputArticleIDImage' class='form-label'>ID Obrázku</label>
        <input type='number' class='form-control' id='inputArticleIDImage' min='0' value='0'>
      </div>
    </div>

    <div class='col-md-6'>
      <div class='mb-3'>
        <label for='inputArticleCategory' class='form-label'>Kategorie</label>
        <input type='text' class='form-control' id='inputArticleCategory'>
      </div>
    </div>
  </div>
  <div class='mb-4'>
    <div class='mb-3'>
      <label for='inputArticleTitle' class='form-label'>Název</label>
      <input type='text' class='form-control' id='inputArticleTitle'>
    </div>

    <div class='mb-3'>
      <div class='row'>
        <div class='col-6'>
          <label for='inputArticleText' class='form-label'>Text</label>
        </div>
        <div class='col-6 text-end'>
          <a class='navbar-brand' href='https://www.markdownguide.org/cheat-sheet/' target='_bland'>
            <i class='bi bi-info-circle'></i>
            MD Cheat Sheet
          </a>
        </div>
      </div>
      <textarea type='text' class='form-control' id='inputArticleText' style='height: 300px'></textarea>
    </div>
  </div>
</div>
<div class='text-center'>
  <button class='btn btn-success' id='adminBtnSaveArticle' onclick='adminBtnSaveArticle()'>Uložit</button>
  <button class='btn btn-secondary' id='adminBtnBackArticle' onclick='adminBtnBackArticle()'>Zpět</button>
</div>
    `}`;
    return template
  };

  initElmValues(id) {
    if (!id) return;
    this.setActivity(true);

    return _BefDb.get(
      `SELECT image_id, title, text, category FROM articles WHERE user_id = ${ElmAdmin.LOGIN_ID} AND id = ${id};`,

      (articles) => {
        let article = articles[0];
        this.setActivity(false);
        this._imageId.value = article.image_id;
        this._category.value = article.category.decodeBase64();
        this._title.value = article.title.decodeBase64();
        return this._text.value = article.text.decodeBase64()
      }
    )
  };

  setActivity(isDisabled) {
    this._imageId.disabled = isDisabled;
    this._category.disabled = isDisabled;
    this._title.disabled = isDisabled;
    this._text.disabled = isDisabled;
    this._btnSave.disabled = isDisabled;
    return this._spinnerOverlay.style.display = isDisabled ? "" : "none"
  }
}