import CDatabase from "../components/elements/elm-quake2-achievements/database";

export default class ElmQuake2Achievements extends HTMLElement {
  constructor() {
    super();
    this._href = this.getAttribute("href");
    let eToken = localStorage.getItem("e_token");
    if (!eToken) return;
    this.initElm();
    this._firstAchievements = this.querySelector("#quake2FirstAchievements");
    this._secondAchievements = this.querySelector("#quake2SecondAchievements");
    this._secondContainerAchievements = this.querySelector("#quake2SecondContainerAchievements");
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
    <div class='row' id='quake2FirstAchievements'>
    </div>

    <div class='accordion' id='quake2SecondAchievements' style='display: none;'>
      <div class='accordion-item'>
        <h3 class='accordion-header'>
          <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
            Staší úspěchy
          </button>
        </h3>
        <div id='collapseOne' class='accordion-collapse collapse' data-bs-parent='#quake2SecondAchievements'>
          <div id='quake2SecondContainerAchievements' class='accordion-body row'></div>
        </div>
      </div>
    </div>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(options) {
    let result = [];

    for (let row of options.db.reverse()) {
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

    return result
  };

  updateInitElm(options) {
    let head, tail;
    let elements = this.subinitElm(options);

    if (elements.length > 4) {
      head = elements.slice(0, 4);
      tail = elements.slice(4);
      this._firstAchievements.innerHTML = head.join("");
      this._secondContainerAchievements.innerHTML = tail.join("");
      return this._secondAchievements.style.display = ""
    } else {
      return this._firstAchievements.innerHTML = elements.join("")
    }
  }
}