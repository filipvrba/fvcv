export default class ElmHeader < HTMLElement
  def initialize
    super
    
    @title = document.title
    @sections = self.get_attribute('sections')

    init_elm()

    window.header_hide = hide
  end

  def hide()
    Events.emit('#navbarSupportedContent', 'collapse.hide')
  end

  def init_elm()
    template = """
<nav class='navbar navbar-expand-lg'>
  <div class='container'>
    <a class='navbar-brand' href='#' onclick='headerHide()'>
      <img src='/png/logo_pivnice-256x256.png' alt='#{@title}' style='height: 64px;'>
      #{@title}
    </a>
    <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
      <span class='navbar-toggler-icon'></span>
    </button>

    <div class='collapse navbar-collapse' id='navbarSupportedContent'>
      <ul class='navbar-nav ml-auto'>
        #{sections_elements(@sections)}
      </ul>
    </div>
  </div>
</nav>
    """

    self.innerHTML = template
  end

  def sections_elements(sections)
    a_sections = []
    sections.strip.split(' ').each do |section|
      href = "\#" + section.remove_diacritics().downcase().gsub('-', '_')
      name = section.gsub(/[-_]/, ' ').capitalize()

      dom = """
      <li class='nav-item'>
        <a class='nav-link' href='#{href}' onclick='headerHide()'>#{name}</a>
      </li>
      """

      a_sections << dom
    end

    return a_sections.join('')
  end
end