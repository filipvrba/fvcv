import ['ENV'], '../../env'

Net.prototype.constructor.SQL_ERR = 'SQL Error'

def bef_json(url, &callback)
  fetch(url)
  .then(lambda do |response|
    response.json()
  end)
  .then(lambda do |data|
    if data.status_code
      console.error("GET: #{data.status_code} #{data.status}")
      callback([]) if callback
    else
      callback(data) if callback
    end
  end)
end
Net.prototype.constructor.bef_json = bef_json

def bef_send(method, query, &callback)
  method = method.upcase()
  
  fetch(ENV::VITE_URL_API, {
    method: method,
    headers: {
      'Token': ENV::VITE_BEF_SERVER,
      'Database': ENV::VITE_DATABASE,
      'Query': query,
    }
  })
  .then(lambda do |response|
    response.json()
  end)
  .then(lambda do |data|
    if data['status_code'] == 403 || data['status_code'] == 405 ||
        data.status == Net::SQL_ERR
      console.error("#{method}: #{data['status_code']} #{data.status}")
      callback(false) if callback
    else
      callback(true) if callback
    end
  end)
end
Net.prototype.constructor.bef_send = bef_send