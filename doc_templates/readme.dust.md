# {name}
[![view on npm](http://img.shields.io/npm/v/{name}.svg)](https://www.npmjs.org/package/{name})
[![npm module downloads per month](http://img.shields.io/npm/dm/{name}.svg)](https://www.npmjs.org/package/{name})
[![Dependency Status](https://david-dm.org/Cellarise/{name}.svg)](https://david-dm.org/Cellarise/{name})

> {description}


##Usage 

This reporter for gulp-jshint requires an object to store the results of each file analysed by jshint.

### As a gulp task

Require this package and use as part of your gulp-jshint task.

```js
var JshintReporterBamboo = require('{name}');
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
{~lb}{~lb}>main{~rb}{~rb}
*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


# License

MIT License (MIT)

Copyright (c) 2014 {author}