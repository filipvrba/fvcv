export default class ElmAdminDashboard < HTMLElement
  PARAMETER = 'admin-index'

  def initialize
    super

    @h_tick = lambda { |e| update(e.detail.value) }

    init_elm()

    window.admin_dashboard_btn_click = button_click
  end

  def connected_callback()
    
  end

  def disconnected_callback()
  end

  def button_click(index)
    URLParams.set(PARAMETER, index)
  end

  def active_navs(index)
    param_index  = URLParams.get_index(PARAMETER)

    if index == param_index
      return {
        nav: 'active',
        content: 'active show',
        index: index
      }
    else
      return {
        nav: '',
        content: '',
        index: index
      }
    end
  end

  def init_elm()
    profile_class = active_navs(0)
    videos_class  = active_navs(1)
    contacts_class  = active_navs(2)
    images_class  = active_navs(3)

    template = """
<div class='mx-auto'>
  <div class='col-md-8 mx-auto'>
    <elm-alert></elm-alert>

    <nav>
      <div class='nav nav-tabs mb-3 justify-content-center' id='nav-tab' role='tablist'>
        <button class='nav-link #{profile_class.nav}' onclick='adminDashboardBtnClick(#{profile_class.index})' id='nav-profile-tab' data-bs-toggle='tab' data-bs-target='#nav-profile' type='button' role='tab' aria-controls='nav-profile' aria-selected='false' tabindex='-1'>Profil</button>
        <button class='nav-link #{videos_class.nav}' onclick='adminDashboardBtnClick(#{videos_class.index})' id='nav-videos-tab' data-bs-toggle='tab' data-bs-target='#nav-videos' type='button' role='tab' aria-controls='nav-videos' aria-selected='false' tabindex='-1'>Videa</button>
        <button class='nav-link #{contacts_class.nav}' onclick='adminDashboardBtnClick(#{contacts_class.index})' id='nav-contacts-tab' data-bs-toggle='tab' data-bs-target='#nav-contacts' type='button' role='tab' aria-controls='nav-contacts' aria-selected='false' tabindex='-1'>Kontakty</button>
        <button class='nav-link #{images_class.nav}' onclick='adminDashboardBtnClick(#{images_class.index})' id='nav-images-tab' data-bs-toggle='tab' data-bs-target='#nav-images' type='button' role='tab' aria-controls='nav-images' aria-selected='false' tabindex='-1'>Obrázky</button>

      </div>
    </nav>
  </div>
  <div class='tab-content' id='nav-tabContent'>
    <div class='tab-pane fade #{profile_class.content} col-md-8 mx-auto' id='nav-profile' role='tabpanel' aria-labelledby='nav-profile-tab'>
      <elm-admin-profile></elm-admin-profile>
    </div>
    <div class='tab-pane fade #{videos_class.content} col-md-8 mx-auto' id='nav-videos' role='tabpanel' aria-labelledby='nav-videos-tab'>
      <elm-admin-videos></elm-admin-videos>
    </div>
    <div class='tab-pane fade #{contacts_class.content} col-md-8 mx-auto' id='nav-contacts' role='tabpanel' aria-labelledby='nav-contacts-tab'>
      <elm-admin-contacts></elm-admin-contacts>
    </div>
    <div class='tab-pane fade #{images_class.content} col-md-8 mx-auto' id='nav-images' role='tabpanel' aria-labelledby='nav-images-tab'>
      <elm-admin-images></elm-admin-images>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end