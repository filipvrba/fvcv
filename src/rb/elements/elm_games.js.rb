import 'objGames', '../../json/games.json'

export default class ElmGames < HTMLElement
  def initialize
    super
    
    init_elm()

    window.game_tr_click = game_tr_click
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def game_tr_click(index)
    if obj_games
      window.open(obj_games.games[index].endpoint, "_self")
    end
  end

  def init_elm()
    template = """
<table class='table table-striped'>
  <thead>
    <tr>
      <th scope='col'></th>
      <th scope='col'>Název</th>
      <th scope='col'>Kategorie</th>
    </tr>
  </thead>
  <tbody>
    #{subinit_elm(obj_games.games)}
  </tbody>
</table>
    """

    self.innerHTML = template
  end

  def subinit_elm(games)
    elements = []
    games.each_with_index do |game, i|
      tr_dom = """
      <tr onclick='gameTrClick(#{i})'>
        <a href='#{game.endpoint}'>
          <th scope='row'>#{i + 1}</th>
          <td>#{game.name}</td>
          <td>#{game.category}</td>
        </a>
      </tr>
      """
      elements.push(tr_dom)
    end

    return elements.join('')
  end
end