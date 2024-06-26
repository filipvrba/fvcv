export default class ElmGithubProjects < HTMLElement
  def initialize
    super
    
    self.innerHTML = "<elm-spinner class='text-center mt-5 mb-5'></elm-spinner>"

    get_repos() do |repos|
      init_elm(repos)
    end
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def get_repos(&callback)
    Net.curl(GITHUB_URL::REPOS) do |response|
      a_repos = []

      repos = JSON.parse(response)
      repos.each do |repo|

        if repo['stargazers_count'].to_i > 0 &&
           repo['description'] && repo['topics'].length > 0
          repo_hash = {
            name: repo['name'],
            description: repo['description'],
            category: repo['topics'].slice(0, 3).join(', '),
            url: repo['html_url'],
            created_at: repo['created_at'].to_date(),
            stargazers_count: repo['stargazers_count'],
          }
          
          a_repos << repo_hash
        end
      end

      callback(a_repos.sort(lambda {|a, b| b.stargazers_count - a.stargazers_count})) if callback
    end
  end

  def init_elm(repos)
    template = """
<div class='row'>
  #{subinit_elm(repos)}
</div>
    """

    self.innerHTML = template
  end

  def subinit_elm(repos)
    result = []
    repos.each do |repo|
      github_template = """
<div class='col-md-6 col-lg-4 mb-4'>
  <div class='card h-100'>
    <div class='card-body d-flex flex-column'>
      <h5 class='card-title'>
        <i class='bi bi-folder'></i>
        #{repo.name}
      </h5>
      <p class='card-text'>#{repo.description}</p>

      <div class='mt-auto'>
        <div class='row g-0 align-items-center'>
          <div class='col-6'>
            <p class='card-text'>
              <small class='text-muted'>
                <i class='bi bi-star-fill'></i>
                #{repo.stargazers_count}
              </small>
              <br>
              <small class='text-muted'>
                <i class='bi bi-tag-fill'></i>
                #{repo.category}
              </small>
              <br>
              <small class='text-muted'>
                <i class='bi bi-calendar-fill'></i>
                #{repo.created_at}
              </small>
            </p>
          </div>

          <div class='col-6 text-center'>
            <a href='#{repo.url}' target='_blank' class='btn btn-primary card-text'>
              <i class='bi bi-eye'></i>
              Podívat se
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      """
      result << github_template
    end

    return result.join('')
  end
end