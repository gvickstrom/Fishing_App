(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const landing = require('../routes/landing');
    const login = require('../routes/login');
    const signUp = require('../routes/sign-up');
    const homepage = require('../routes/homepage');
    const sites = require('../routes/sites');
    const reports = require('../routes/reports');
    const singleStation = require('../routes/single-station');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/landing', landing);
    app.use('/login', login);
    app.use('/sign-up', signUp);
    app.use('/homepage', homepage);
    app.use('/sites', sites);
    app.use('/reports', reports);
    app.use('/single-station', singleStation);
  };

})(module.exports);
