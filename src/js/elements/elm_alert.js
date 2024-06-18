export default class ElmAlert extends HTMLElement {
  constructor() {
    super();
    this._hShow = e => this.show(e.detail.value);
    this._hTick = e => this.update(e.detail.value);
    this._isEnable = false;
    this._time = 0;
    this._endTime = 0
  };

  connectedCallback() {
    Events.connect("#app", "tick", this._hTick);
    return Events.connect("#app", ElmAlert.ENVS.SHOW, this._hShow)
  };

  disconnectedCallback() {
    Events.disconnect("#app", "tick", this._hTick);
    return Events.disconnect("#app", ElmAlert.ENVS.SHOW, this._hShow)
  };

  show(data) {
    this._isEnable = true;
    this._time = 0;
    this._endTime = data.endTime;
    this.initElm(data.message);
    return window.scrollTo(0, 0)
  };

  update(dt) {
    if (!this._isEnable) return;

    if (this._time >= this._endTime) {
      this._isEnable = false;
      this.initElm()
    };

    return this._time += dt
  };

  initElm(message="") {
    let template = "";

    if (this._isEnable) {
      template = `${`
      <div class='alert alert-secondary' role='alert'>
        ${message}
      </div>
      `}`
    };

    return this.innerHTML = template
  }
};

ElmAlert.ENVS = {SHOW: "a0"}