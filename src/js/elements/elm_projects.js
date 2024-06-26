export default class ElmProjects extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>";
    this.getRepos(repos => this.initElm(repos))
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  getRepos(callback) {
    return Net.curl(GITHUB_URL.REPOS, (response) => {
      let aRepos = [];
      let repos = JSON.parse(response);

      for (let repo of repos) {
        if (parseInt(repo.stargazers_count) > 0 && repo.description && repo.topics.length > 0) {
          let repoHash = {
            name: repo.name,
            url: repo.html_url,
            stargazersCount: repo.stargazers_count
          };

          aRepos.push(repoHash)
        }
      };

      if (callback) {
        return callback(aRepos.sort((a, b) => b.stargazersCount - a.stargazersCount))
      }
    })
  };

  initElm(repos) {
    let template = `${`
    <div class='list-group list-group-flush'>
      ${this.subinitElm(repos)}
    </div>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(repos) {
    let aRepos = [];

    for (let repo of repos) {
      let liDom = `${`
      <div class='list-group-item d-flex justify-content-between align-items-center'>
        <a href='${repo.url}' class='navbar-brand' target='_blank'>
          <strong class='h5'>${repo.name}</strong>
        </a>
        <span class='d-flex align-items-center'>
          <i class='bi bi-star-fill me-1'></i>
          <span>${repo.stargazersCount}</span>
        </span>
      </div>
      `}`;
      aRepos.push(liDom)
    };

    return aRepos.join("")
  }
}