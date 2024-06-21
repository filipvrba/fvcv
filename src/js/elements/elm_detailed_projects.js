import blob from "../../txt/encode_file.txt?raw";

//<img src='data:image/jpeg;base64,#{blob}'>
export default class ElmDetailedProjects extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  // init_elm()
  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`\n    \n    `}`;
    return this.innerHTML = template
  }
}