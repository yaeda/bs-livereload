Browsersync Live Reload
=========================
[![Build Status](https://travis-ci.org/yaeda/bs-livereload.svg)](https://travis-ci.org/yaeda/bs-livereload)

Browsersync plugin for easy livereloading / NO MORE `reload` AND `stream`


How to use
-------------------------

```
var browserSync = require('browser-sync').create();
var bsLivereload = require('bs-livereload');

browserSync.use(bsLivereload);
browserSync.init({
  server: {
    baseDir: "./app",
    middleware: bsLivereload.middleware
  }
});
```
