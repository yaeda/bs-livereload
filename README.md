Browsersync Live Reload
=========================
Browsersync plugin for easy livereloading

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
