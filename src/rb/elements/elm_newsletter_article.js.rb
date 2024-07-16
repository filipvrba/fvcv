export default class ElmNewsletterArticle < HTMLElement
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
<div class='container'>
  <div class='card text-center'>
    <div class='card-body'>
      <i class='bi bi-exclamation-triangle-fill text-warning' style='font-size: 2rem;'></i>
      <h3 class='card-title mt-3'>Článek</h3>
      <p class='card-text'>
        Toto je úvodní část článku.
        Pro pokračování ve čtení je nutné se přihlásit
        k odběru newsletteru. Prosím, přejděte do sekce
        newsletter a zadejte svůj e-mail pro přihlášení.
      </p>
      <a class='btn btn-secondary' href='#newsletter'>
        <i class='bi bi-arrow-right-circle'></i> Přejít
      </a>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end