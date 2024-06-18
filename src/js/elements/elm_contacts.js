import dataDomContactsObj from "../../json/data_dom_contacts.json";
import ElmAdmin from "./elm_admin";

export default class ElmContacts extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>";

    _BefDb.get(
      `SELECT phone, email, facebook, reddit, linkedin, github, youtube FROM contacts WHERE user_id = ${ElmAdmin.LOGIN_ID};`,

      (rows) => {
        let data = rows[0];
        return this.initElm(data)
      }
    )
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm(dbContacts) {
    let template = `${`\n<div class='row'>\n  ${this.subinitElm(dbContacts)}\n</div>\n    `}`;
    return this.innerHTML = template
  };

  subinitElm(dbContacts) {
    let domContacts = [];

    Object.values(dataDomContactsObj).forEach((domContact, i) => {
      let url, username;
      let dbContact = Object.values(dbContacts)[i];
      let cardText = dbContact;

      if (domContact.dom.length !== 0) {
        url = dbContact;

        username = dbContact.replace(/\/$/m, "").split("/")[dbContact.replace(
          /\/$/m,
          ""
        ).split("/").length - 1];

        cardText = domContact.dom.replace("URL", url).replace(
          "USERNAME",
          username
        )
      };

      let contactTemplate = `${`
<div class='col-md-6 mb-4'>
  <div class='card'>
    <div class='card-body text-center'>
      <i class='bi ${domContact.icon}' style='font-size: 2rem;'></i>
      <h5 class='card-title mt-2'>${domContact.name}</h5>
      <p class='card-text'>${cardText}</p>
    </div>
  </div>
</div>
      `}`;
      return domContacts.push(contactTemplate)
    });

    return domContacts.join("")
  }
}