import ['ENV'], '../../env'

class Database
  attr_writer :is_verbose

  def initialize
    @is_verbose = true
  end

  def query(query, &callback)
    is_set = set(query) do |data|
      callback(data) if callback
    end
    unless is_set
      get(query) do |data|
        callback(data) if callback
      end
    end
  end

  def get(query, &callback)
    query_encode = encodeURIComponent(query)
    uri = "#{ENV::VITE_URL_API}?token=#{ENV::VITE_BEF_CLIENT}" +
      "&database=#{ENV::VITE_DATABASE}&query=#{query_encode}"

    Net.bef_json(uri) do |data|
      callback(data) if callback
    end
  end

  def set(query, &callback)
    is_active = false
    low_query = query.toLowerCase()
    if low_query.indexOf('insert into') > -1 ||
       low_query.indexOf('create table') > -1
      is_active = true
      Net.bef_send('post', query, @is_verbose) do |data|
        callback(data) if callback
      end
    elsif low_query.indexOf('delete') > -1
      is_active = true
      Net.bef_send('delete', query, @is_verbose) do |data|
        callback(data) if callback
      end
    elsif low_query.indexOf('update') > -1
      is_active = true
      Net.bef_send('patch', query, @is_verbose) do |data|
        callback(data) if callback
      end
    end

    return is_active
  end
end
window.__bef_db = Database.new