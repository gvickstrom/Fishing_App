(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const landing = require('../routes/landing');
    const signUp = require('../routes/sign-up');
    const homepage = require('../routes/homepage');
    const sites = require('../routes/sites');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/landing', landing);
    app.use('/sign-up', signUp);
    app.use('/homepage', homepage);
    app.use('/sites', sites);

  };

})(module.exports);
