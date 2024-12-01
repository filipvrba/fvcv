export default class Net {
  static curl(url, callback) {
    return fetch(url).then(response => response.text()).then((text) => {
      if (callback) return callback(text)
    })
  };

  static googleImage(id, callback) {
    return Net.curl(`/api/google-image?id=${id}`, (result) => {
      let base64Image = JSON.parse(result).base64;
      if (callback) return callback(base64Image)
    })
  }
};

window.Net = Net