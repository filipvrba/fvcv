export default class ElmAdminChat extends HTMLElement {
  constructor() {
    super();

    this._hSendMessageClick = (_) => {
      return this.sendMessage()
    };

    this._hChatMessageKeypress = e => this.chatMessageKeypress(e);
    this.initElm();
    this._sendMessage = this.querySelector("#sendMessage");
    this._chatMessage = this.querySelector("#chatMessage");
    this._chatMessages = this.querySelector(".chat-messages")
  };

  connectedCallback() {
    this._sendMessage.addEventListener("click", this._hSendMessageClick);

    return this._chatMessage.addEventListener(
      "keypress",
      this._hChatMessageKeypress
    )
  };

  disconnectedCallback() {
    this._sendMessage.removeEventListener(
      "click",
      this._hSendMessageClick
    );

    return this._chatMessage.removeEventListener(
      "keypress",
      this._hChatMessageKeypress
    )
  };

  sendMessage() {
    let message = this._chatMessage.value.trim();

    if (message) {
      this.initMessage(message);
      this._chatMessage.value = "";

      return setTimeout(
        () => {
          let duckMessages = ["duck", "duck duck", "duck duck duck"];
          let randomIndex = (0).random(duckMessages.length);
          let duckMessage = duckMessages[randomIndex];
          return this.initMessage(duckMessage, false)
        },

        500
      )
    }
  };

  chatMessageKeypress(event) {
    if (event.key === "Enter") return this._sendMessage.click()
  };

  initElm() {
    let template = `${`
<div class='chat-container mt-3'>
  <img src='/png/duck_01.png' alt='Duck Watermark' class='watermark'>

  <div class='chat-messages'>
      <!-- Messages will be appended here -->
  </div>
  <div class='chat-input'>
      <input type='text' id='chatMessage' placeholder='Na co se chceš zeptat?'>
      <button id='sendMessage'><i class='bi bi-send'></i></button>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  };

  initMessage(message, isRight=true) {
    let style = isRight ? "text-align: right;" : "";
    let classBadgeColor = isRight ? "text-bg-primary" : "text-bg-warning";
    let template = `${`
    <div class='mx-3 badge-container' style='${style}'>
      <span class='badge ${classBadgeColor} custom-badge'>${message}</span>
    </div>
    
    `}`;
    this._chatMessages.innerHTML += template;
    return this._chatMessages.scrollTop = this._chatMessages.scrollHeight
  }
}