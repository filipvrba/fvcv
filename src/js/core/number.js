function randomRange() {
  return Math.floor(Math.random() * this)
};

Number.prototype.randomRange = randomRange