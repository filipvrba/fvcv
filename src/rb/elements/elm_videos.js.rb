import 'ElmAdmin', './elm_admin'

export default class ElmVideos < HTMLElement
  def initialize
    super
    
    self.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>"

    __bef_db.get("SELECT video_data FROM videos WHERE user_id = #{ElmAdmin::LOGIN_ID};") do |rows|
      data = rows[0]['video_data']
      data_decode = data.decode_pretty_json()
      @db_videos = JSON.parse(data_decode)
      init_elm(@db_videos)
    end

    window.video_tr_click = video_tr_click
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def video_tr_click(index)
    if @db_videos
      window.open(@db_videos[index].url, '_blank').focus()
    end
  end

  def init_elm(videos)
    template = """
<table class='table'>
  <thead>
    <tr>
      <th scope='col'>#</th>
      <th scope='col'>Název</th>
      <th scope='col'>Kategorie</th>
    </tr>
  </thead>
  <tbody>
    #{subinit_elm(videos)}
  </tbody>
</table>
    """

    self.innerHTML = template
  end

  def subinit_elm(videos)
    elements = []
    videos.each_with_index do |video, i|
      tr_dom = """
      <tr onclick='videoTrClick(#{i})'>
        <th scope='row'>#{i + 1}</th>
        <td>#{video.name}</td>
        <td>#{video.category}</td>
      </tr>
      """
      elements.push(tr_dom)
    end

    return elements.join('')
  end
end