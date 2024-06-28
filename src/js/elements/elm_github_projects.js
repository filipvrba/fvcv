export default class ElmGithubProjects extends HTMLElement {
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
            description: repo.description,
            category: repo.topics.slice(0, 3).join(", "),
            url: repo.html_url,
            createdAt: repo.created_at.toDate(),
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
    let template = `${`\n<div class='row'>\n  ${this.subinitElm(repos)}\n</div>\n    `}`;
    return this.innerHTML = template
  };

  subinitElm(repos) {
    let result = [];

    for (let repo of repos) {
      let githubTemplate = `${`
<div class='col-md-6 col-lg-4 mb-4'>
  <div class='card h-100'>
    <div class='card-body d-flex flex-column'>
      <h5 class='card-title'>
        <i class='bi bi-folder'></i>
        ${repo.name}
      </h5>
      <p class='card-text'>${repo.description}</p>

      <div class='mt-auto'>
        <div class='row g-0 align-items-center'>
          <div class='col-6'>
            <p class='card-text'>
              <small class='text-muted'>
                <i class='bi bi-star-fill'></i>
                ${repo.stargazersCount}
              </small>
              <br>
              <small class='text-muted'>
                <i class='bi bi-tag-fill'></i>
                ${repo.category}
              </small>
              <br>
              <small class='text-muted'>
                <i class='bi bi-calendar-fill'></i>
                ${repo.createdAt}
              </small>
            </p>
          </div>

          <div class='col-6 text-center'>
            <a href='${repo.url}' target='_blank' class='btn btn-secondary card-text'>
              <i class='bi bi-eye'></i>
              Podívat se
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      `}`;
      result.push(githubTemplate)
    };

    return result.join("")
  }
}