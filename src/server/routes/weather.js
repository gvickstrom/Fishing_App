const axios = require('axios');

exports.getWeather = function (lat, lng) {
  console.log('hitWeather');
  return axios.get(`https://api.darksky.net/forecast/2e41cd367153b0382dd154001a4576fc/${lat},${lng}`);
};
