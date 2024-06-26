import 'ElmAdmin', './elm_admin'
import 'ElmAlert', './elm_alert'

export default class ElmAdminImages < HTMLElement
  def initialize
    super

    @h_upload_file_input_change = lambda { |e| upload_file_input_change(e) }

    init_elm()

    @upload_file_input = document.get_element_by_id(:upload_file_input)
    @spinner = document.get_element_by_id('spinner')
    @images_tbody = document.get_element_by_id('imagesTBody')
    
    reinit_from_db()

    window.dropdown_btn_upload_click = dropdown_btn_upload_click
    window.dropdown_btn_remove_click = dropdown_btn_remove_click
  end

  def reinit_from_db()
    spinner_display(true)
    __bef_db.get("SELECT id, name, image_base64 FROM images " +
                 "WHERE user_id = #{ElmAdmin::LOGIN_ID};") do |rows|

      spinner_display(false)
      subinit_elm(rows)
    end
  end

  def connected_callback()
    @upload_file_input.add_event_listener('change', @h_upload_file_input_change)
  end

  def disconnected_callback()
    @upload_file_input.remove_event_listener('change', @h_upload_file_input_change)
  end

  def dropdown_btn_upload_click()
    @upload_file_input.click()
  end

  def dropdown_btn_remove_click()
    table_images = document.get_element_by_id('tableImages')
    rows = table_images.query_selector_all('tr')

    ids = []
    rows.each_with_index do |row, i|
      if i == 0
        next
      end

      input_elm = row.query_selector('input')
      if input_elm.checked
        id = input_elm.id.sub('check', '')
        ids.push(id)
      end
    end

    if ids.length > 0
      query = "DELETE FROM images WHERE id IN (#{ids.join(', ')});"
      __bef_db.set(query) do |is_deleted|
        if is_deleted
          reinit_from_db()
          Events.emit('#app', ElmAlert::ENVS::SHOW, {
            end_time: 7,
            message: "Obrázek byl úspěšně odebrán."
          })
        end
      end
    end
  end

  def upload_file_input_change(event)
    file = event.target.files[0]
    reader = FileReader.new

    reader.onload = lambda do |e|
      # base64_str = e.target.result.split('base64,')[1]
      upload_file_on_db(file.name, e.target.result)
    end
    reader.read_as_dataURL(file)
  end

  def upload_file_on_db(name, base64_file)
    __bef_db.set("INSERT INTO images (user_id, name, image_base64) " +
                 "VALUES (#{ElmAdmin::LOGIN_ID}, '#{name}', '#{base64_file}');") do |is_upload|
      if is_upload
        reinit_from_db()
        Events.emit('#app', ElmAlert::ENVS::SHOW, {
          end_time: 7,
          message: "Obrázek byl úspěšně uložen."
        })
      end
    end
  end

  def spinner_display(is_active)
    if is_active
      spinner.style.display = ''
    else
      spinner.style.display = :none
    end
  end

  def init_elm(rows)
    template = """
<input type='file' id='uploadFileInput' style='display: none;'>
<table class='table' id='tableImages'>
  <thead>
    <tr>
      <th scope='col'></th>
      <th scope='col'>Název</th>
      <th scope='col'>Velikost</th>
      <th scope='col' class='text-end'>
        <div class='dropdown'>
          <button class='btn btn-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
            <i class='bi bi-gear'></i>
            Akce
          </button>
          <ul class='dropdown-menu'>
            <li>
              <button class='dropdown-item' onclick='dropdownBtnUploadClick()'>Nahrát</button>
            </li>
            <li>
              <button class='dropdown-item' onclick='dropdownBtnRemoveClick()'>Odebrat</button>
            </li>
          </ul>
        </div>
      </th>
    </tr>
  </thead>
  <tbody id='imagesTBody'>
    
  </tbody>
  
</table>
<div id='spinner'>
  <elm-spinner class='text-center mt-5 mb-5'></elm-spinner>
</div>
    """

    self.innerHTML = template
  end

  def subinit_elm(rows)
    trs_result = []

    rows.each do |row|
      template = """
<tr>
  <th scope='row'>#{row.id}</th>
  <td>#{row.name}</td>
  <td>#{row['image_base64'].size_in_kb()} kB</td>
  <td>
    <div class='d-flex justify-content-center mb-3 form-check'>
      <input type='checkbox' class='form-check-input' id='check#{row.id}'>
      <label class='form-check-label' for='check#{row.id}'></label>
    </div>
  </td>
</tr>
      """
      trs_result.push(template)
    end

    @images_tbody.innerHTML = trs_result.join('')
  end
end
