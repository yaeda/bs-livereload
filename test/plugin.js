var browserSync  = require('browser-sync').create();
var bsLivereload = require('../index');
var expect       = require('expect.js');

describe('plugin', function () {
  it('should run with Browsersync `.use()`', function (done) {
    browserSync.use(bsLivereload);
    browserSync.init({
      server: {
        middleware: bsLivereload.middleware,
      },
      logLevel: 'silent',
      open: false
    }, function (err, bs) {
      expect(bs.getUserPlugins()[0].name).to.be('bs-livereload');
      expect(bs.getUserPlugins()[0].active).to.be(true);
      bs.cleanup();
      done();
    });
  });

  it('should run when UI is disabled', function (done) {
    browserSync.use(bsLivereload);
    browserSync.init({
      server: {
        middleware: bsLivereload.middleware,
      },
      logLevel: 'silent',
      open: false,
      ui: false
    }, function (err, bs) {
      expect(bs.getUserPlugins()[0].name).to.be('bs-livereload');
      expect(bs.getUserPlugins()[0].active).to.be(true);
      bs.cleanup();
      done();
    });
  });

});
