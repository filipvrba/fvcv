import adminSectionsObj from "../../json/admin_sections.json";

export default class ElmAdminDashboard extends HTMLElement {
  constructor() {
    super();
    this._hTick = e => update(e.detail.value);
    this._sections = this.getAttribute("sections").trim().split(" ");
    this.initElm();
    window.adminDashboardBtnClick = this.buttonClick.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  buttonClick(index) {
    return URLParams.set(ElmAdminDashboard.PARAMETER, index)
  };

  activeNavs(index) {
    let paramIndex = URLParams.getIndex(ElmAdminDashboard.PARAMETER);

    if (index === paramIndex) {
      return {nav: "active", content: "active show"}
    } else {
      return {nav: "", content: ""}
    }
  };

  initButtons() {
    let result = [];

    this._sections.forEach((section, i) => {
      let template = `${`\n<button class='nav-link ${this.activeNavs(i).nav}' onclick='adminDashboardBtnClick(${i})' id='nav-${section}-tab' data-bs-toggle='tab' data-bs-target='#nav-${section}' type='button' role='tab' aria-controls='nav-${section}' aria-selected='false' tabindex='-1'>${adminSectionsObj[section].name}</button>\n      `}`;
      return result.push(template)
    });

    return result.join("")
  };

  initTabElements() {
    let result = [];

    this._sections.forEach((section, i) => {
      let elementName = adminSectionsObj[section].element;
      let template = `${`
<div class='tab-pane fade ${this.activeNavs(i).content} col-md-8 mx-auto' id='nav-${section}' role='tabpanel' aria-labelledby='nav-${section}-tab'>
<${elementName}></${elementName}>
</div>
      `}`;
      return result.push(template)
    });

    return result.join("")
  };

  initElm() {
    let template = `${`
<div class='mx-auto'>
  <div class='col-md-8 mx-auto'>
    <elm-alert></elm-alert>

    <nav>
      <div class='nav nav-tabs mb-3 justify-content-center' id='nav-tab' role='tablist'>
        ${this.initButtons()}
      </div>
    </nav>
  </div>
  <div class='tab-content' id='nav-tabContent'>
    ${this.initTabElements()}
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmAdminDashboard.PARAMETER = "admin-index"