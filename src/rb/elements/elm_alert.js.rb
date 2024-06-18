export default class ElmAlert < HTMLElement
  ENVS = {
    SHOW: 'a0'
  }

  def initialize
    super
    @h_show = lambda { |e| show(e.detail.value) }
    @h_tick = lambda { |e| update(e.detail.value) }

    @is_enable = false
    @time = 0
    @end_time = 0
  end

  def connected_callback()
    Events.connect('#app', 'tick', @h_tick)
    Events.connect('#app', ElmAlert::ENVS::SHOW, @h_show)
  end

  def disconnected_callback()
    Events.disconnect('#app', 'tick', @h_tick)
    Events.disconnect('#app', ElmAlert::ENVS::SHOW, @h_show)
  end

  def show(data)
    @is_enable = true
    @time = 0
    @end_time = data.end_time

    init_elm(data.message)
    window.scroll_to(0, 0)
  end

  def update(dt)
    unless @is_enable
      return
    end

    if @time >= @end_time
      @is_enable = false
      init_elm()
    end

    @time += dt
  end

  def init_elm(message = '')
    template = ''

    if @is_enable
      template = """
      <div class='alert alert-secondary' role='alert'>
        #{message}
      </div>
      """
    end

    self.innerHTML = template
  end
end