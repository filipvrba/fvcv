import ElmAdmin from "./elm_admin";
import ElmAlert from "./elm_alert";

export default class ElmAdminBlog extends HTMLElement {
  constructor() {
    super();

    this._hDnBtnArticleNew = (_) => {
      return this.dnBtnArticleNewClick()
    };

    this._hDnBtnArticleRemove = (_) => {
      return this.dnBtnArticleRemoveClick()
    }
  };

  connectedCallback() {
    this.innerHTML = this.initElm();
    this._spinner = this.querySelector("#spinnerBlog");
    this._articlesTbody = this.querySelector("#articlesTBody");
    Events.connect("#dnBtnArticleNew", "click", this._hDnBtnArticleNew);

    Events.connect(
      "#dnBtnArticleRemove",
      "click",
      this._hDnBtnArticleRemove
    );

    window.aArticleTitleClick = this.aArticleTitleClick.bind(this);
    return this.reinitFromDb()
  };

  disconnectedCallback() {
    this.querySelector("#dnBtnArticleNew").removeEventListener(
      "click",
      this._hDnBtnArticleNew
    );

    return this.querySelector("#dnBtnArticleRemove").removeEventListener(
      "click",
      this._hDnBtnArticleRemove
    )
  };

  dnBtnArticleNewClick() {
    return this.innerHTML = "<elm-admin-article></elm-admin-article>"
  };

  dnBtnArticleRemoveClick() {
    let query;

    // Find selected ids
    let trArticles = this._articlesTbody.querySelectorAll("tr");
    let ids = [];

    for (let trArticle of trArticles) {
      let inputElm = trArticle.querySelector("input");

      if (inputElm.checked) {
        let id = inputElm.id.replace("checkArticle", "");
        ids.push(id)
      }
    };

    if (ids.length > 0) {
      query = `DELETE FROM articles WHERE id IN (${ids.join(", ")});`;

      return _BefDb.set(query, (isDeleted) => {
        if (isDeleted) {
          this.reinitFromDb();

          return Events.emit(
            "#app",
            ElmAlert.ENVS.SHOW,
            {endTime: 7, message: "Článek byl úspěšně odebrán."}
          )
        }
      })
    }
  };

  aArticleTitleClick(id) {
    return this.innerHTML = `<elm-admin-article id='${id}'></elm-admin-article>`
  };

  spinnerDisplay(isActive) {
    return isActive ? this._spinner.style.display = "" : this._spinner.style.display = "none"
  };

  reinitFromDb() {
    this.spinnerDisplay(true);

    return _BefDb.get(
      `SELECT id, image_id, title, text, category FROM articles WHERE user_id = ${ElmAdmin.LOGIN_ID};`,

      (articles) => {
        this.spinnerDisplay(false);
        return this.subinitElm(articles)
      }
    )
  };

  initElm() {
    let template = `${`
<table class='table' id='tableArticles'>
  <thead>
    <tr>
      <th scope='col'></th>
      <th scope='col'>Název</th>
      <th scope='col'>Kategorie</th>
      <th scope='col' class='text-end'>
        <div class='dropdown'>
          <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
            <i class='bi bi-gear'></i>
            Akce
          </button>
          <ul class='dropdown-menu'>
            <li>
              <button id='dnBtnArticleNew' class='dropdown-item'>Nový</button>
            </li>
            <li>
              <button id='dnBtnArticleRemove' class='dropdown-item'>Odebrat</button>
            </li>
          </ul>
        </div>
      </th>
    </tr>
  </thead>
  <tbody id='articlesTBody'>
    
  </tbody>
  
</table>
<div id='spinnerBlog'>
  <elm-spinner class='text-center mt-5 mb-5'></elm-spinner>
</div>
    `}`;
    return template
  };

  subinitElm(articles) {
    let trsResult = [];

    for (let article of articles) {
      let template = `${`
<tr id='trArticle'>
  <th scope='row'>${article.id}</th>
  <td>
    <a class='btn-img navbar-brand' onclick='aArticleTitleClick(${article.id})'>${article.title.decodeBase64()}</a>
  </td>
  <td>${article.category.decodeBase64()}</td>
  <td>
    <div class='d-flex justify-content-center mb-3 form-check'>
      <input type='checkbox' class='form-check-input' id='checkArticle${article.id}'>
      <label class='form-check-label' for='checkArticle${article.id}'></label>
    </div>
  </td>
</tr>
      `}`;
      trsResult.push(template)
    };

    return this._articlesTbody.innerHTML = trsResult.join("")
  }
}