import 'CDatabase', '../components/elements/elm-quake2-achievements/database'

export default class ElmQuake2Achievements < HTMLElement
  def initialize
    super
    
    @href   = self.get_attribute('href')
    e_token = local_storage.get_item('e_token')

    unless e_token
      return
    end

    init_elm()
    @first_achievements = self.query_selector('#quake2FirstAchievements')
    @second_achievements = self.query_selector('#quake2SecondAchievements')
    @second_container_achievements = self.query_selector('#quake2SecondContainerAchievements')
    @c_database   = CDatabase.new(e_token)

    get_data()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def get_data()
    Net.curl("#{@href}/json/achievements.json") do |str_achievements|
      obj_achievements = JSON.parse(str_achievements)
      unless obj_achievements
        return
      end

      @c_database.get_achievements() do |rows|
        update_init_elm({obj: obj_achievements, db: rows})
      end
    end
  end

  def init_elm()
    template = """
    <h2 class='text-center'>Úspěchy</h2>
    <div class='row' id='quake2FirstAchievements'>
    </div>

    <div class='accordion' id='quake2SecondAchievements' style='display: none;'>
      <div class='accordion-item'>
        <h3 class='accordion-header'>
          <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
            Staší úspěchy
          </button>
        </h3>
        <div id='collapseOne' class='accordion-collapse collapse' data-bs-parent='#quake2SecondAchievements'>
          <div id='quake2SecondContainerAchievements' class='accordion-body row'></div>
        </div>
      </div>
    </div>
    """

    self.innerHTML = template
  end

  def subinit_elm(options)
    result = []
    options.db.reverse().each do |row|
      achievement_id   = row['achievement_id'].to_i
      achievement_data = options.obj.ids[achievement_id]
      img              = achievement_data.img
      title            = achievement_data.name
      description      = row.value

      template = """
      <div class='col-md-6 mx-auto'>
        <div class='achievement-notification'>
          <div class='d-flex align-items-center'>
            <img src='#{@href}#{img}' alt='#{title}' class='me-3'>
            <div>
              <h5 class='mb-1'>#{title}</h5>
              <p class='mb-0'>#{description}</p>
            </div>
          </div>
        </div>
      </div>
      """
      result.push(template)
    end
    return result
  end

  def update_init_elm(options)
    elements = subinit_elm(options)

    unless elements.length > 4
      @first_achievements.innerHTML = elements.join('')
    else
      head = elements.slice(0, 4)
      tail = elements.slice(4)

      @first_achievements.innerHTML = head.join('')
      @second_container_achievements.innerHTML = tail.join('')
      @second_achievements.style.display = ''
    end
  end
end