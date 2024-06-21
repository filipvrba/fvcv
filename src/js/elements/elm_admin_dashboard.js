export default class ElmAdminDashboard extends HTMLElement {
  constructor() {
    super();
    this._hTick = e => update(e.detail.value);
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
      return {nav: "active", content: "active show", index}
    } else {
      return {nav: "", content: "", index}
    }
  };

  initElm() {
    let profileClass = this.activeNavs(0);
    let videosClass = this.activeNavs(1);
    let contactsClass = this.activeNavs(2);
    let imagesClass = this.activeNavs(3);
    let template = `${`
<div class='mx-auto'>
  <div class='col-md-8 mx-auto'>
    <elm-alert></elm-alert>

    <nav>
      <div class='nav nav-tabs mb-3 justify-content-center' id='nav-tab' role='tablist'>
        <button class='nav-link ${profileClass.nav}' onclick='adminDashboardBtnClick(${profileClass.index})' id='nav-profile-tab' data-bs-toggle='tab' data-bs-target='#nav-profile' type='button' role='tab' aria-controls='nav-profile' aria-selected='false' tabindex='-1'>Profil</button>
        <button class='nav-link ${videosClass.nav}' onclick='adminDashboardBtnClick(${videosClass.index})' id='nav-videos-tab' data-bs-toggle='tab' data-bs-target='#nav-videos' type='button' role='tab' aria-controls='nav-videos' aria-selected='false' tabindex='-1'>Videa</button>
        <button class='nav-link ${contactsClass.nav}' onclick='adminDashboardBtnClick(${contactsClass.index})' id='nav-contacts-tab' data-bs-toggle='tab' data-bs-target='#nav-contacts' type='button' role='tab' aria-controls='nav-contacts' aria-selected='false' tabindex='-1'>Kontakty</button>
        <button class='nav-link ${imagesClass.nav}' onclick='adminDashboardBtnClick(${imagesClass.index})' id='nav-images-tab' data-bs-toggle='tab' data-bs-target='#nav-images' type='button' role='tab' aria-controls='nav-images' aria-selected='false' tabindex='-1'>Obrázky</button>

      </div>
    </nav>
  </div>
  <div class='tab-content' id='nav-tabContent'>
    <div class='tab-pane fade ${profileClass.content} col-md-8 mx-auto' id='nav-profile' role='tabpanel' aria-labelledby='nav-profile-tab'>
      <elm-admin-profile></elm-admin-profile>
    </div>
    <div class='tab-pane fade ${videosClass.content} col-md-8 mx-auto' id='nav-videos' role='tabpanel' aria-labelledby='nav-videos-tab'>
      <elm-admin-videos></elm-admin-videos>
    </div>
    <div class='tab-pane fade ${contactsClass.content} col-md-8 mx-auto' id='nav-contacts' role='tabpanel' aria-labelledby='nav-contacts-tab'>
      <elm-admin-contacts></elm-admin-contacts>
    </div>
    <div class='tab-pane fade ${imagesClass.content} col-md-8 mx-auto' id='nav-images' role='tabpanel' aria-labelledby='nav-images-tab'>
      <elm-admin-images></elm-admin-images>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmAdminDashboard.PARAMETER = "admin-index"