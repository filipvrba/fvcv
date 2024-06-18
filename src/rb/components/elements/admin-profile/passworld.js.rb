import 'CryptoJS', 'crypto-js'
import 'ElmAdmin', '../../../elements/elm_admin'
import 'ElmAlert', '../../../elements/elm_alert'

export default class CPassworld
  def initialize
    @admin_input_password_new = document.get_element_by_id('adminPasswordNew')
    @admin_btn_save_password = document.get_element_by_id('adminBtnSavePassword')
    @admin_input_password_new_repeat = document.get_element_by_id('adminPasswordNewRepeat')

    window.admin_btn_save_password = admin_btn_save_password
    window.admin_password_new_input_change = admin_password_new_input_change
    window.admin_password_new_repeat_input_change = admin_password_new_repeat_input_change

    admin_password_new_input_change()
  end

  def admin_password_new_input_change()
    @admin_btn_save_password.disabled = @admin_input_password_new.value.length == 0 ||
      @admin_input_password_new_repeat.value.length == 0
  end

  def admin_btn_save_password()
    if @admin_input_password_new_repeat.value == @admin_input_password_new.value
      btn_success_save_password(@admin_input_password_new.value)
    else
      @admin_input_password_new_repeat.class_list.add('is-invalid')
    end
  end

  def admin_password_new_repeat_input_change()
    admin_password_new_input_change()

    if @admin_input_password_new_repeat.class_list.contains('is-invalid')
      @admin_input_password_new_repeat.class_list.remove('is-invalid')
    end
  end

  def btn_success_save_password(new_password)
    hashed_password = CryptoJS::MD5(new_password).to_s

    __bef_db.set("UPDATE users SET password_hash = '#{hashed_password}' " +
                 "WHERE id = #{ElmAdmin::LOGIN_ID};") do |is_save|
      if is_save
        @admin_input_password_new.value = ''
        @admin_input_password_new_repeat.value = ''
        admin_password_new_input_change()

        Events.emit('#app', ElmAlert::ENVS::SHOW, {
          end_time: 7,
          message: "Profil byl úspěšně uložen."
        })
      end
    end
  end
end