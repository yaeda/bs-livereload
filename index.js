var url = require('url');
var path = require('path');
var fs = require('fs');
var config = require('./config');

var bs = null;
var bsPublicInstance = null;
var baseDir = null;
var enabled = true;

var watchIfExists = function (dir, filename) {
  var filepath = path.join(dir, filename);
  if (fs.existsSync(filepath)) {
    // watch file and reload
    // TODO : support stream
    // TODO : avoid adding multiple listeners
    bsPublicInstance.watch(filepath).on('change', bsPublicInstance.reload);
    return true;
  }
};

module.exports.middleware = function (req, res, next) {
  var pathname = url.parse(req.originalUrl || req.url).pathname;
  var filename = pathname.substr(-1) === '/' ? pathname + 'index.html' : pathname;

  if (bs.utils.isList(baseDir)) {
    baseDir.forEach(function (dir) {
      if (watchIfExists(dir, filename)) {
        return false;
      }
    });
  } else {
    watchIfExists(baseDir, filename);
  }

  next();
};

module.exports.plugin = function (option, browsersync) {
  bs = browsersync;
  bsPublicInstance = browsersync.publicInstance;
  baseDir = browsersync.options.getIn(['server', 'baseDir']);

  var opts = option || {};
  var logger = bs.getLogger(config.PLUGIN_NAME).info('Running...');
  if (typeof opts.logLevel !== 'undefined') {
      logger.setLevel(opts.logLevel);
  }

  bs.events.on('plugins:configure', function (data) {

    if (data.name !== config.PLUGIN_NAME) {
      return;
    }

    enabled = data.active;
    if (enabled) {
      bsPublicInstance.resume();
    } else {
      bsPublicInstance.pause();
    }
  });
};

module.exports['plugin:name'] = config.PLUGIN_NAME;
