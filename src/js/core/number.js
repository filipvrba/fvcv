function randomRange() {
  return Math.floor(Math.random() * this)
};

Number.prototype.randomRange = randomRange;

function random(max) {
  let min = this;
  return Math.floor(Math.random() * (max - min) + min)
};

Number.prototype.random = random