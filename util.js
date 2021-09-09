var sleep = function (delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1);
      } catch (e) {
        reject(0);
      }
    }, delay);
  });
};

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
  sleep,
  random,
};
