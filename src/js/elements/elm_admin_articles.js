export default class ElmAdminArticles extends HTMLElement {
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
    let template = `${`\n    \n    `}`;
    return this.innerHTML = template
  }
}