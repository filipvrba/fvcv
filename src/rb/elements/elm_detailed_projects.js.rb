import 'blob', '../../txt/encode_file.txt?raw'
#<img src='data:image/jpeg;base64,#{blob}'>

export default class ElmDetailedProjects < HTMLElement
  def initialize
    super
    
    init_elm()
  end

  def connected_callback()
    # init_elm()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
    
    """

    self.innerHTML = template
  end
end