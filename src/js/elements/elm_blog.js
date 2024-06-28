import ElmAdmin from "./elm_admin";

export default class ElmBlog extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>";
    let query = `SELECT articles.id, users.username, images.image_base64, articles.title, articles.text, articles.category, articles.created_at FROM articles JOIN users ON articles.user_id = users.id LEFT JOIN images ON articles.image_id = images.id WHERE articles.user_id = ${ElmAdmin.LOGIN_ID};`;
    _BefDb.get(query, articles => this.initElm(articles))
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm(articles) {
    let template = `${`
    <div class='row'>
      ${this.subinitElm(articles)}
    </div>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(articles) {
    let result = [];

    for (let article of articles) {
      let title = article.title.decodeBase64();
      let endpoint = Routes.getEndpointArticle(article.id, title);
      let template = `${`
<div class='col-md-6 mb-4'>
  <div class='card h-100'>
    <img src='${article.image_base64}' class='card-img-top' alt='Náhled článku'>
    <div class='card-body d-flex flex-column'>
      <h5 class='card-title'>
        <i class='bi bi-folder'></i>
        ${title}
      </h5>
      <p class='card-text'>${article.text.decodeBase64().maxLength(150)}</p>

      <div class='mt-auto'>
        <div class='row g-0 align-items-center'>
          <div class='col-6'>
            <p class='card-text'>
              <small class='text-muted'>
                <i class='bi bi-tag-fill'></i>
                ${article.category.decodeBase64()}
              </small>
              <br>
              <small class='text-muted'>
                <i class='bi bi-calendar-fill'></i>
                ${article.created_at.toDate()}
              </small>
            </p>
          </div>

          <div class='col-6 text-center'>
            <a href='#${endpoint}' class='btn btn-secondary card-text'>
              <i class='bi bi-eye'></i>
              Podívat se
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      `}`;
      result.push(template)
    };

    return result.reverse().join("")
  }
}