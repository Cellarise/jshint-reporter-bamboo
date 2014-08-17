Given the Javascript file:

```js
for (i=0; i < 10; i = i + 1) {
    ctr = ctr + i;
}
```

When you pass the file to a `new JshintReporterBamboo()` using 'results' as report results.

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

Then you'll get a jshint report:

```js
//jshint ignore:start
var author = "{author}";
var name = "{name}";
var description = "{description}";
var version = "{version}";
```
