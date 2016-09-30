const axios = require('axios');

exports.getWeather = function (lat, lng) {
  console.log('lat inside getWeather: ', lat);
  // return axios.get(`https://api.darksky.net/forecast/2e41cd367153b0382dd154001a4576fc/${lat},${lng}`);
  return axios.get(`http://galvanize-cors-proxy.herokuapp.com/https://api.darksky.net/forecast/2e41cd367153b0382dd154001a4576fc/39.59443117,-105.9725158`);
};
