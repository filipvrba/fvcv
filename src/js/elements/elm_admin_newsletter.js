export default class ElmAdminNewsletter extends HTMLElement {
  constructor() {
    super()
  };

  connectedCallback() {
    this.initElm();
    this._spinner = this.querySelector("#spinnerNewsletter");
    this._newslettersTbody = this.querySelector("#newsletterTBody");
    return this.reinitFromDb()
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<div class='text-center'>
<h2>Přihlášení</h2>
</div>

<div class='table-responsive'>
  <table class='table' id='tableNewsletter'>
    <thead>
      <tr>
        <th scope='col'></th>
        <th scope='col'>Email</th>
        <th scope='col'>Vytvořeno</th>
      </tr>
    </thead>
    <tbody id='newsletterTBody'>
    
    </tbody>
    
  </table>
</div>
<div id='spinnerNewsletter'>
  <elm-spinner class='text-center mt-5 mb-5'></elm-spinner>
</div>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(newsletters) {
    let trsResult = [];

    for (let newsletter of newsletters) {
      let template = `${`
<tr id='trArticle'>
  <th scope='row'>${newsletter.id}</th>
  <td>${newsletter.email}</td>
  <td>${newsletter.created_at.toDate()}</td>
</tr>
      `}`;
      trsResult.push(template)
    };

    return this._newslettersTbody.innerHTML = trsResult.join("")
  };

  spinnerDisplay(isActive) {
    return isActive ? this._spinner.style.display = "" : this._spinner.style.display = "none"
  };

  reinitFromDb() {
    this.spinnerDisplay(true);

    return _BefDb.get(
      "SELECT id, email, created_at FROM newsletter;",

      (newsletters) => {
        this.spinnerDisplay(false);
        return this.subinitElm(newsletters)
      }
    )
  }
}