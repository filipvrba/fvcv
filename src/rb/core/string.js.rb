import 'CryptoJS', 'crypto-js'

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

def decode_pretty_json(spaces = 4)
  data_decode = CryptoJS.enc.Base64.parse(self).to_string(CryptoJS.enc.Utf8)
  json_obj = JSON.parse(data_decode)
  JSON.stringify(json_obj, nil, spaces)
end

String.prototype.decode_pretty_json = decode_pretty_json

def encode_pretty_json()
  json_obj = JSON.parse(self)
  json_str = JSON.stringify(json_obj)
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(json_str))
end

String.prototype.encode_pretty_json = encode_pretty_json

def decode_base64()
  CryptoJS.enc.Base64.parse(self).to_string(CryptoJS.enc.Utf8)
end

String.prototype.decode_base64 = decode_base64

def encode_base64()
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(self))
end

String.prototype.encode_base64 = encode_base64

def to_date()
  date = Date.new(self)
  s_iso_date = date.toISOString().replace(/T.*$/, '').split('-')
  day = s_iso_date[2]
  month = s_iso_date[1]
  year = s_iso_date[0]
  
  return "#{day}. #{month}. #{year}"
end

String.prototype.to_date = to_date

def size_in_kb()
  encoder = TextEncoder.new
  encoded_string = encoder.encode(self)
  byte_length = encoded_string.length
  size_kb = byte_length / 1024
  
  return Math.ceil(size_kb)
end

String.prototype.size_in_kb = size_in_kb

def max_length(length = 120)
  if self.length > length
    return self.substring(0, length) + '...'
  else
    return self
  end
end
String.prototype.max_length = max_length