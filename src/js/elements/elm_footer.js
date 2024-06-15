export default class ElmFooter extends HTMLElement {
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
    let template = `${`
<footer class='text-center py-4'>
  <div class='container'>
    <p>&copy; 2024 ${TITLE_APP}. Všechna práva vyhrazena.</p>
  </div>
</footer>
    `}`;
    return this.innerHTML = template
  }
}