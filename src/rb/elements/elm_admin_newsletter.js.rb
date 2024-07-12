export default class ElmAdminNewsletter < HTMLElement
  def initialize
    super
  end

  def connected_callback()
    init_elm()

    @spinner           = self.query_selector('#spinnerNewsletter')
    @newsletters_tbody = self.query_selector('#newsletterTBody')

    reinit_from_db()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
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
    """

    self.innerHTML = template
  end

  def subinit_elm(newsletters)
    trs_result = []
    
    newsletters.each do |newsletter|
      template = """
<tr id='trArticle'>
  <th scope='row'>#{newsletter.id}</th>
  <td>#{newsletter.email}</td>
  <td>#{newsletter['created_at'].to_date()}</td>
</tr>
      """

      trs_result.push(template)
    end

    @newsletters_tbody.innerHTML = trs_result.join('')
  end

  def spinner_display(is_active)
    if is_active
      @spinner.style.display = ''
    else
      @spinner.style.display = :none
    end
  end

  def reinit_from_db()
    spinner_display(true)
    __bef_db.get("SELECT id, email, created_at FROM newsletter;") do |newsletters|
      spinner_display(false)
      subinit_elm(newsletters)
    end
  end
end