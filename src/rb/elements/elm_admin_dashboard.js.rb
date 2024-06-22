import 'adminSectionsObj', '../../json/admin_sections.json'

export default class ElmAdminDashboard < HTMLElement
  PARAMETER = 'admin-index'

  def initialize
    super

    @h_tick = lambda { |e| update(e.detail.value) }

    @sections = self.get_attribute('sections').strip.split(' ')

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
        content: 'active show'
      }
    else
      return {
        nav: '',
        content: ''
      }
    end
  end

  def init_buttons()
    result = []
    @sections.each_with_index do |section, i|
      template = """
<button class='nav-link #{active_navs(i).nav}' onclick='adminDashboardBtnClick(#{i})' id='nav-#{section}-tab' data-bs-toggle='tab' data-bs-target='#nav-#{section}' type='button' role='tab' aria-controls='nav-#{section}' aria-selected='false' tabindex='-1'>#{admin_sections_obj[section].name}</button>
      """
      result.push(template)
    end
    return result.join('')
  end

  def init_tab_elements()
    result = []
    @sections.each_with_index do |section, i|
      element_name = admin_sections_obj[section].element
      template = """
<div class='tab-pane fade #{active_navs(i).content} col-md-8 mx-auto' id='nav-#{section}' role='tabpanel' aria-labelledby='nav-#{section}-tab'>
<#{element_name}></#{element_name}>
</div>
      """
      result.push(template)
    end
    return result.join('')
  end

  def init_elm()
    template = """
<div class='mx-auto'>
  <div class='col-md-8 mx-auto'>
    <elm-alert></elm-alert>

    <nav>
      <div class='nav nav-tabs mb-3 justify-content-center' id='nav-tab' role='tablist'>
        #{init_buttons()}
      </div>
    </nav>
  </div>
  <div class='tab-content' id='nav-tabContent'>
    #{init_tab_elements()}
  </div>
</div>
    """

    self.innerHTML = template
  end
end