(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const sitesRoutes = require('../routes/sites');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/sites', sitesRoutes);

  };

})(module.exports);
