export default class ElmBtnPlay < HTMLElement
  def initialize
    super

    @href = self.get_attribute('href')
    
    init_elm()
  end

  def init_elm()
    e_token = local_storage.get_item('e_token')
    href    = "#{@href}?et=#{e_token}"

    template = """
    <a href='#{href}' class='btn btn-secondary rounded-pill mb-2'>
      <i class='bi bi-play-fill'></i>
      Hrát
    </a>
    """

    self.innerHTML = template
  end
end