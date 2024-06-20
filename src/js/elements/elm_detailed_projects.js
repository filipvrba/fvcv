export default class ElmDetailedProjects extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`\n<div class='row'>\n  ${this.subinitElm()}\n</div>\n    `}`;
    return this.innerHTML = template
  };

  subinitElm() {
    let githubTemplate = `${`
<div class='col-md-6 mb-4'>
  <div class='card'>
    <div class='card-body'>
      <h5 class='card-title'>Projekt 1</h5>
      <p class='card-text'>Krátký popis projektu 1.</p>
      <a href='https://github.com/uzivatel/projekt1' class='btn btn-primary'>Podívat se</a>
    </div>
    <div class='card-footer'>
      <small class='text-muted'>Datum vytvoření: 01.01.2023</small>
    </div>
  </div>
</div>
    `}`;
    return githubTemplate
  }
}