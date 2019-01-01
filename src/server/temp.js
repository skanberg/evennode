const Netatmo = require("netatmo");

const netatmo = new Netatmo({
  client_id: process.env.NETATMO_CLIENT_ID,
  client_secret: process.env.NETATMO_CLIENT_SECRET,
  username: process.env.NETATMO_USERNAME,
  password: process.env.NETATMO_PASSWORD
});

module.exports = () =>
  new Promise((resolve, reject) => {
    netatmo.getStationsData(function(err, devices) {
      if (err) {
        reject(err);
      } else {
        const outdoorModule = devices[0].modules[0];
        resolve({
          current: outdoorModule.dashboard_data.Temperature
        });
      }
    });
  });
