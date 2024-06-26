export default class ElmProjects < HTMLElement
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
            url: repo['html_url'],
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
    <div class='list-group list-group-flush'>
      #{subinit_elm(repos)}
    </div>
    """

    self.innerHTML = template
  end

  def subinit_elm(repos)
    a_repos = []
    repos.each do |repo|
      li_dom = """
      <div class='list-group-item d-flex justify-content-between align-items-center'>
        <a href='#{repo.url}' class='navbar-brand' target='_blank'>
          <strong class='h5'>#{repo.name}</strong>
        </a>
        <span class='d-flex align-items-center'>
          <i class='bi bi-star-fill me-1'></i>
          <span>#{repo.stargazers_count}</span>
        </span>
      </div>
      """
      a_repos << li_dom
    end
    return a_repos.join('')
  end
end