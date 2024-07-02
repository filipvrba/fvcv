export default class ElmAdminChat < HTMLElement
  def initialize
    super
    
    @h_send_message_click    = lambda { |_| send_message() }
    @h_chat_message_keypress = lambda { |e| chat_message_keypress(e) } 

    init_elm()

    @send_message = self.query_selector('#sendMessage')
    @chat_message = self.query_selector('#chatMessage')
    @chat_messages = self.query_selector('.chat-messages')
  end

  def connected_callback()
    @send_message.add_event_listener('click', @h_send_message_click)
    @chat_message.add_event_listener('keypress', @h_chat_message_keypress)
  end

  def disconnected_callback()
    @send_message.remove_event_listener('click', @h_send_message_click)
    @chat_message.remove_event_listener('keypress', @h_chat_message_keypress)
  end

  def send_message()
    message = @chat_message.value.strip

    if message
      init_message(message)
      @chat_message.value = ''
      

      set_timeout(lambda do
        duck_messages = ['duck', 'duck duck', 'duck duck duck']
        random_index = 0.random(duck_messages.length)
        duck_message = duck_messages[random_index]
        init_message(duck_message, false)
      end, 500)
    end
  end

  def chat_message_keypress(event)
    if event.key == 'Enter'
      @send_message.click()
    end
  end

  def init_elm()
    template = """
<div class='chat-container mt-3'>
  <img src='/png/duck_01.png' alt='Duck Watermark' class='watermark'>

  <div class='chat-messages'>
      <!-- Messages will be appended here -->
  </div>
  <div class='chat-input'>
      <input type='text' id='chatMessage' placeholder='Na co se chceš zeptat?'>
      <button id='sendMessage'><i class='bi bi-send'></i></button>
  </div>
</div>
    """

    self.innerHTML = template
  end

  def init_message(message, is_right = true)
    style = is_right ? "text-align: right;" : ''

    template = """
    <div class='text-break' style='#{style}'>
      <span class='mx-3'>#{message}</span>
    </div>
    
    """
    @chat_messages.innerHTML += template
    @chat_messages.scroll_top = @chat_messages.scroll_height
  end
end