export default class Net
  def self.curl(url, &callback)
    fetch(url)
    .then(lambda do |response|
      response.text()
    end)
    .then(lambda do |text|
      callback(text) if callback
    end)
  end

  def self.google_image(id, &callback)
    Net.curl("/api/google-image?id=#{id}") do |result|
      base64_image = JSON.parse(result).base64
      callback(base64_image) if callback
    end
  end
end
window.Net = Net
