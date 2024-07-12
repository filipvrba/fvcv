import objGames from "../../json/games.json";

export default class ElmGames extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    window.gameTrClick = this.gameTrClick.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  gameTrClick(index) {
    if (objGames) return window.open(objGames.games[index].endpoint, "_self")
  };

  initElm() {
    let template = `${`
<table class='table table-striped'>
  <thead>
    <tr>
      <th scope='col'></th>
      <th scope='col'>Název</th>
      <th scope='col'>Kategorie</th>
    </tr>
  </thead>
  <tbody>
    ${this.subinitElm(objGames.games)}
  </tbody>
</table>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(games) {
    let elements = [];

    games.forEach((game, i) => {
      let trDom = `${`
      <tr onclick='gameTrClick(${i})'>
        <a href='${game.endpoint}'>
          <th scope='row'>${i + 1}</th>
          <td>${game.name}</td>
          <td>${game.category}</td>
        </a>
      </tr>
      `}`;
      return elements.push(trDom)
    });

    return elements.join("")
  }
}