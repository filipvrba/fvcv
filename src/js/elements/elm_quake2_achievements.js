import CDatabase from "../components/elements/elm-quake2-achievements/database";

export default class ElmQuake2Achievements extends HTMLElement {
  constructor() {
    super();
    this._href = this.getAttribute("href");
    let eToken = localStorage.getItem("e_token");
    if (!eToken) return;
    this.initElm();
    this._achievements = this.querySelector("#quake2Achievements");
    this._cDatabase = new CDatabase(eToken);
    this.getData()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  getData() {
    return Net.curl(
      `${this._href}/json/achievements.json`,

      (strAchievements) => {
        let objAchievements = JSON.parse(strAchievements);
        if (!objAchievements) return;

        return this._cDatabase.getAchievements(rows => (
          this.updateInitElm({obj: objAchievements, db: rows})
        ))
      }
    )
  };

  initElm() {
    let template = `${`
    <h2 class='text-center'>Úspěchy</h2>
    <div class='row' id='quake2Achievements'>
    </div>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(options) {
    let result = [];

    for (let row of options.db) {
      let achievementId = parseInt(row.achievement_id);
      let achievementData = options.obj.ids[achievementId];
      let img = achievementData.img;
      let title = achievementData.name;
      let description = row.value;
      let template = `${`
      <div class='col-md-6 mx-auto'>
        <div class='achievement-notification'>
          <div class='d-flex align-items-center'>
            <img src='${this._href}${img}' alt='${title}' class='me-3'>
            <div>
              <h5 class='mb-1'>${title}</h5>
              <p class='mb-0'>${description}</p>
            </div>
          </div>
        </div>
      </div>
      `}`;
      result.push(template)
    };

    return result.join("")
  };

  updateInitElm(options) {
    return this._achievements.innerHTML = this.subinitElm(options)
  }
}