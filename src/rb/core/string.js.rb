def capitalize()
  str = self
  unless str
    return str
  end

  str.char_at(0).upcase() + str.slice(1).downcase()
end

String.prototype.capitalize = capitalize

def remove_diacritics()
  self.normalize("NFD").gsub(/[\u0300-\u036f]/, "")
end

String.prototype.remove_diacritics = remove_diacritics