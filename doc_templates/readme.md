# jshint-reporter-bamboo
[![view on npm](http://img.shields.io/npm/v/jshint-reporter-bamboo.svg)](https://www.npmjs.org/package/jshint-reporter-bamboo)
[![npm module downloads per month](http://img.shields.io/npm/dm/jshint-reporter-bamboo.svg)](https://www.npmjs.org/package/jshint-reporter-bamboo)
[![Dependency Status](https://david-dm.org/Cellarise/jshint-reporter-bamboo.svg)](https://david-dm.org/Cellarise/jshint-reporter-bamboo)

> A reporter for gulp-jshint which produces a report compatible with Atlassian Bamboo Mocha Test Parser.


##Usage 

This reporter for gulp-jshint requires an object to store the results of each file analysed by jshint.

### As a gulp task

Require this package and use as part of your gulp-jshint task.

```js
var JshintReporterBamboo = require('jshint-reporter-bamboo');
var jshint = require('gulp-jshint');
var results = {};
gulp.src('./lib')
.pipe(jshint())
.pipe(new JshintReporterBamboo(results));
.on('end', function() {
    fs.writeFileSync('report.json', JSON.stringify(results, null, 2), 'utf-8');
    done();
});
```


# API
{{>main}}
*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


# License

MIT License (MIT)

Copyright (c) 2014 John Barry