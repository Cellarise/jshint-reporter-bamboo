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
<a name="module_jshint-reporter-bamboo"></a>
#jshint-reporter-bamboo
A reporter for gulp-jshint which produces a report compatible with Atlassian Bamboo Mocha Test Parser.

**Params**

- reportJSON `Object` - Atlassian Bamboo Mocha Test Parser JSON object to be updated with the results of the test  
- opts `Object` - Task configuration options  
  - \[suiteName='JSHint'\] `string` - The test suite name  
  - \[suiteDesc='JSHint'\] `string` - The test suite description  

**Type**: `name`  
**Returns**: `readable-stream/transform`  
**Example**  
Given the Javascript file:

```js
for (i=0; i < 10; i = i + 1) {
    ctr = ctr + i;
}
```

When you pass the file to a `new JshintReporterBamboo()` using 'results' as report results.

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

Then you'll get a jshint report:

```js
//jshint ignore:start
var author = "John Barry";
var name = "jshint-reporter-bamboo";
var description = "A reporter for gulp-jshint which produces a report compatible with Atlassian Bamboo Mocha Test Parser.";
var version = "0.0.0";
```



*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


# License

MIT License (MIT)

Copyright (c) 2014 John Barry