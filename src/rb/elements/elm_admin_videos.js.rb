import 'ElmAdmin', './elm_admin'
import 'ElmAlert', './elm_alert'

export default class ElmAdminVideos < HTMLElement
  def initialize
    super
    
    self.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>"

    __bef_db.get("SELECT video_data FROM videos WHERE user_id = #{ElmAdmin::LOGIN_ID};") do |rows|
      data = rows[0]['video_data']
      data_decode = data.decode_pretty_json()
      init_elm(data_decode)
    end

    window.admin_btn_save_videos = admin_btn_save_videos
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def admin_btn_save_videos()
    video_data_encode = document.get_element_by_id('floatingVideosTextarea')
      .value.encode_pretty_json()

    __bef_db.set("UPDATE videos SET video_data = '#{video_data_encode}' " +
                 "WHERE user_id = #{ElmAdmin::LOGIN_ID};") do |is_save|
      if is_save
        Events.emit('#app', ElmAlert::ENVS::SHOW, {
          end_time: 7,
          message: "Videa byla úspěšně uložena."
        })
      end
    end
  end

  def init_elm(data)
    template = """
<div class='text-center'>
  <div class='form-floating'>
    <textarea class='form-control' placeholder='Leave a comment here' id='floatingVideosTextarea' style='height: 300px'>#{data}</textarea>
    <label for='floatingVideosTextarea'>Editor</label>
  </div>
  <button class='btn btn-secondary mt-3 mb-5' id='adminBtnSavePassword' onclick='adminBtnSaveVideos()'>Uložit</button>
</div>
    """

    self.innerHTML = template
  end
end