import 'ElmAdmin', './elm_admin'
import 'ElmAlert', './elm_alert'

export default class ElmAdminWebsites < HTMLElement
  def initialize
    super
    
    self.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>"

    __bef_db.get("SELECT name, description, url, image_id FROM websites WHERE user_id = #{ElmAdmin::LOGIN_ID};") do |rows|
      init_elm(rows)
    end

    window.admin_btn_save_websites = admin_btn_save_websites
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def generate_insert_query()
    websites_json = document.get_element_by_id('floatingWebsitesTextarea').value
    websites_obj  = JSON.parse(websites_json)

    unless websites_obj.length > 0
      return nil
    end

    result = [
      'INSERT INTO websites (user_id, name, description, url, image_id) VALUES'
    ]
    websites_obj.each_with_index do |row, i|
      symbol_end = websites_obj.length == (i+1) ? ';' : ','
      name_encode        = row.name.encode_base64()
      description_encode = row.description.encode_base64()

      query_row = "(#{ElmAdmin::LOGIN_ID}, '#{name_encode}', '#{description_encode}', " +
                  "'#{row.url}', #{row['image_id']})#{symbol_end}"

      result.push(query_row)
    end

    return result.join(' ').strip
  end

  def admin_btn_save_websites()
    query = generate_insert_query()

    unless query
      Events.emit('#app', ElmAlert::ENVS::SHOW, {
        end_time: 7,
        message: "Chyba uložení webů. Je prázný editor!"
      })
      return
    end

    __bef_db.set('DELETE FROM websites;') do |is_deleted|
      if is_deleted
        __bef_db.set(query) do |is_save|
          if is_save
            Events.emit('#app', ElmAlert::ENVS::SHOW, {
              end_time: 7,
              message: "Weby byly úspěšně uloženy."
            })
          end
        end
      end
    end
  end

  def init_elm(rows)
    data = [].concat(rows)
    rows.each_with_index do |row, i|
      data[i].name        = row.name.decode_base64()
      data[i].description = row.description.decode_base64()
    end
    data_str =  JSON.stringify(data, nil, 1)

    template = """
<div class='text-center'>
  <div class='form-floating'>
    <textarea class='form-control' placeholder='Leave a comment here' id='floatingWebsitesTextarea' style='height: 300px'>#{data_str}</textarea>
    <label for='floatingWebsitesTextarea'>Editor</label>
  </div>
  <button class='btn btn-secondary mt-3 mb-5' id='adminBtnSaveWebsites' onclick='adminBtnSaveWebsites()'>Uložit</button>
</div>
    """

    self.innerHTML = template
  end
end
