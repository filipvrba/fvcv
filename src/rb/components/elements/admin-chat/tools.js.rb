export default class CTools
  BEF = 'bef'

  def search_to_use(message, &callback)
    case true
    when /^#{BEF}/.test(message)
      fn_bef(message) do |m|
        callback(m)
      end
    end
  end

  def fn_bef(message, &callback)
    regex_bef_query = /^#{BEF}.query/
    case true
    when regex_bef_query.test(message)
      query = message.sub(regex_bef_query, '').strip
      .gsub(/^[("']{1,2}|[)"']{1,2}$/, '')

      __bef_db.query(query) do |rows|
        str_json = rows.json_pretty()

        callback(str_json)
        return
      end
    else
      callback("""
Backend Filip REST API
This is a backend that is communicated with via rest api.

Usage: bef.[functions]

Functions:
┌ query(...)
└─ Executes a query for the backend using an SQL query.
      """)
    end
  end
end