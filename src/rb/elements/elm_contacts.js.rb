import 'dataDomContactsObj', '../../json/data_dom_contacts.json'
import 'ElmAdmin', './elm_admin'

export default class ElmContacts < HTMLElement
  def initialize
    super
    
    self.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>"

    __bef_db.get("SELECT phone, email, facebook, reddit, linkedin, github " +
                 "FROM contacts WHERE user_id = #{ElmAdmin::LOGIN_ID};") do |rows|
      data = rows[0]
      init_elm(data)
    end
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm(db_contacts)
    template = """
<div class='row'>
  #{subinit_elm(db_contacts)}
</div>
    """

    self.innerHTML = template
  end

  def subinit_elm(db_contacts)
    dom_contacts = []
    data_dom_contacts_obj.values().each_with_index do |dom_contact, i|
      db_contact = db_contacts.values()[i]
      card_text = db_contact

      unless dom_contact.dom.empty?
        url      = db_contact
        username = db_contact.sub(/\/$/, '').split('/').last
        
        card_text = dom_contact.dom.sub('URL', url).sub('USERNAME', username)
      end

      contact_template = """
<div class='col-md-6 mb-4'>
  <div class='card'>
    <div class='card-body text-center'>
      <i class='bi #{dom_contact.icon}' style='font-size: 2rem;'></i>
      <h5 class='card-title mt-2'>#{dom_contact.name}</h5>
      <p class='card-text'>#{card_text}</p>
    </div>
  </div>
</div>
      """
      dom_contacts.push(contact_template)
    end
    return dom_contacts.join('')
  end
end
