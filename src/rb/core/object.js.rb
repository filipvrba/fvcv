def json_pretty(space = 2)
  str_result = JSON.stringify(self, nil, space)
  escaped_result = str_result
  .gsub(/&/, "&amp;")
  .gsub(/</, "&lt;")
  .gsub(/>/, "&gt;")
  .gsub(/"/, "&quot;")
  .gsub(/'/, "&#039;")

  return escaped_result
end
  
Object.prototype.json_pretty = json_pretty
