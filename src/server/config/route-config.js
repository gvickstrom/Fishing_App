(function (routeConfig) {

  'use strict';

  routeConfig.init = (app) => {

    // *** routes *** //
    const routes = require('../routes/index');
    const landing = require('../routes/landing');
    const signUp = require('../routes/sign-up');
    const homepage = require('../routes/homepage');
    const logout = require('../routes/logout');
    const sites = require('../routes/sites');
    const cookieSession = require('cookie-session');
    const reports = require('../routes/reports');
    const singleStation = require('../routes/single-station');

    // *** register routes *** //

    app.use(cookieSession({
      name: 'session',
      keys: [process.env.SECRET_KEY]
    }));

    app.use((req, res, next) => {
      req.renderObject = {};
      if (req.session.user) {
        req.renderObject.user = req.session.user;
        next();
      } else {
        next();
      }
    });

    app.use('/', routes);
    app.use('/landing', landing);
    app.use('/sign-up', signUp);
    app.use('/homepage', homepage);
    app.use('/logout', logout);
    app.use('/sites', sites);
    app.use('/reports', reports);
    app.use('/single-station', singleStation);
  };

})(module.exports);
