(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const homepageRoutes = require('../routes/homepage');
    const sitesRoutes = require('../routes/sites');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/homepage', homepageRoutes);
    app.use('/sites', sitesRoutes);

  };

})(module.exports);
