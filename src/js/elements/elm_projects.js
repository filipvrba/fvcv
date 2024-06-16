export default class ElmProjects extends HTMLElement {
  constructor() {
    super();
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
    let template = `${`\n    <ul>\n      ${this.subinitElm(repos)}\n    </ul>\n    `}`;
    return this.innerHTML = template
  };

  subinitElm(repos) {
    let aRepos = [];

    for (let repo of repos) {
      let liDom = `${`
      <li class='lead'>
        <a href='${repo.url}' class='navbar-brand'><strong>${repo.name}</strong></a>
      </li>
      `}`;
      aRepos.push(liDom)
    };

    return aRepos.join("")
  }
}