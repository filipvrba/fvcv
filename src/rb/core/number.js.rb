def random_range()
  Math.floor(Math.random() * self)
end

Number.prototype.random_range = random_range

def random(max)
  min = self
  Math.floor(Math.random() * (max - min) + min)
end

Number.prototype.random = random