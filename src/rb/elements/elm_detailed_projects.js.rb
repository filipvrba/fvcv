export default class ElmDetailedProjects < HTMLElement
  def initialize
    super
    
    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<div class='row'>
  #{subinit_elm()}
</div>
    """

    self.innerHTML = template
  end

  def subinit_elm()
    github_template = """
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
    """
  end
end