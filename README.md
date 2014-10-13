# jshint-reporter-bamboo
[![view on npm](http://img.shields.io/npm/v/jshint-reporter-bamboo.svg?style=flat)](https://www.npmjs.org/package/jshint-reporter-bamboo)
[![npm module downloads per month](http://img.shields.io/npm/dm/jshint-reporter-bamboo.svg?style=flat)](https://www.npmjs.org/package/jshint-reporter-bamboo)
[![Dependency status](https://david-dm.org/Cellarise/jshint-reporter-bamboo.svg?style=flat)](https://david-dm.org/Cellarise/jshint-reporter-bamboo)
[![Coverage](https://img.shields.io/badge/coverage-96%25_skipped:0%25-green.svg?style=flat)](https://www.npmjs.org/package/jshint-reporter-bamboo)

> A reporter for gulp-jshint which produces a report compatible with Atlassian Bamboo Mocha Test Parser.


##Usage 

This reporter for gulp-jshint requires an object to store the results of each file analysed by jshint.

### As a gulp task

Require this package and use as part of your gulp-jshint task. Pass an empty 'report' object. The report results will be available on `report.results`.

```js
var JshintReporterBamboo = require('jshint-reporter-bamboo');
var jshint = require('gulp-jshint');
var report = {};
gulp.src('./lib')
.pipe(jshint())
.pipe(new JshintReporterBamboo(report));
.on('end', function() {
    fs.writeFileSync('report.json', JSON.stringify(report.results, null, 2), 'utf-8');
    done();
});
```



# API
<a name="module_jshint-reporter-bamboo"></a>
#jshint-reporter-bamboo
A reporter for gulp-jshint which produces a report compatible with Atlassian Bamboo Mocha Test Parser.

**Params**

- reportJSON `Object` - object to receive the results of the test.  The report results will be available on `report.results`.  
- opts `Object` - Task configuration options  
  - \[report='mocha'\] `string` - The test report format to use.  Select from 'mocha' or 'cucumber'.  
  - \[suiteName='JSHint'\] `string` - The test suite name  
  - \[suiteDesc=''\] `string` - The test suite description  

**Type**: `name`  
**Returns**: `readable-stream/transform`  
**Example**  
Given the Javascript file:

```js
for (i=0; i < 10; i = i + 1) {
    ctr = ctr + i;
}
```

When you pass the file to a `new JshintReporterBamboo()` using an empty 'report' object.  The report results will be available on `report.results`.

```js
var JshintReporterBamboo = require('jshint-reporter-bamboo');
var jshint = require('gulp-jshint');
var report = {};
gulp.src('./lib')
.pipe(jshint())
.pipe(new JshintReporterBamboo(report));
.on('end', function() {
    fs.writeFileSync('report.json', JSON.stringify(report.results, null, 2), 'utf-8');
    done();
});
```

Then you'll get a jshint mocha formatted report:

```js
{
  "stats": {
    "start": "2014-08-22T06:04:30.645Z",
    "end": "2014-08-22T06:04:30.707Z",
    "suites": null,
    "tests": null,
    "duration": 62,
    "passes": null
  },
  "failures": [],
  "passes": [
    {
      "title": " index.js",
      "fullTitle": " \\jshint-reporter-bamboo\\lib\\index.js",
      "duration": 62
    }
  ],
  "skipped": []
}
```

When you pass the file to a `new JshintReporterBamboo()` using options report='cucumber'.

```js
var JshintReporterBamboo = require('jshint-reporter-bamboo');
var jshint = require('gulp-jshint');
var report = {};
gulp.src('./lib')
.pipe(jshint())
.pipe(new JshintReporterBamboo(report, {report:'cucumber'}));
.on('end', function() {
    fs.writeFileSync('report.json', JSON.stringify(report.results, null, 2), 'utf-8');
    done();
});
```

Then you'll get a jshint cucumber formatted report:

```js
[
  {
    "id": "JSHINT-code-analysis-feature",
    "uri": "features/JSHINT-code-analysis.feature",
    "keyword": "Feature",
    "name": "JSHINT code analysis",
    "line": 1,
    "description": "As a developer\nI want to ensure JSHINT code analysis standards are met\nSo that my code is conformant with technical standards designed to ensure consistency and readability",
    "elements": [
      {
        "id": "index.js",
        "keyword": "Scenario",
        "name": "index.js",
        "line": 3,
        "description": "\\jshint-reporter-bamboo\\lib\\index.js",
        "type": "scenario",
        "steps": [
          {
            "result": {
              "duration": 0,
              "status": "passed"
            },
            "name": "a Javascript file",
            "keyword": "Given ",
            "line": 4
          },
          {
            "result": {
              "duration": 0,
              "status": "passed"
            },
            "name": "analysed using JSHint and the repositories default JSHint configuration file",
            "keyword": "When ",
            "line": 5
          },
          {
            "result": {
              "duration": 0,
              "status": "passed"
            },
            "name": "the file should meet the defined coding standards",
            "keyword": "Then ",
            "line": 6
          }
        ]
      }
    ]
  }
]
```


*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


#Changelog

<table style="width:100%;border-spacing:0px;border-collapse:collapse;margin:0px;padding:0px;border-width:0px;">
   <tr>
    <th style="width:20px;text-align:center;"></th>
    <th style="width:80px;text-align:center;">Type</th> 
    <th style="width:80px;text-align:left;">ID</th>
    <th style="text-align:left;">Summary</th>
   </tr>

  <tr>
    <td colspan=4><strong>Version: 0.1.4 - released 2014-10-13</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Non-functional</td> 
    <td style="width:80px;text-align:left;">MSJSHRB-8</td>
    <td>Package: Remove all gulp tasks except &#39;test&#39; and update readme docs</td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Bug</td> 
    <td style="width:80px;text-align:left;">MSJSHRB-7</td>
    <td>Package: Fix mocha error reporting</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.1.3 - released 2014-08-30</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Non-functional</td> 
    <td style="width:80px;text-align:left;">MSJSHRB-6</td>
    <td>Package: Migrate to new Cellarise Package Manager.</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.1.2 - released 2014-08-23</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Feature</td> 
    <td style="width:80px;text-align:left;">MSJSHRB-5</td>
    <td>Package: Add cucumber report output format.</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.1.1 - released 2014-08-21</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Non-functional</td> 
    <td style="width:80px;text-align:left;">MSJSHRB-4</td>
    <td>Package: Update dependencies.</td>
   </tr>


  <tr>
    <td colspan=4><strong>Version: 0.1.0 - released 2014-08-17</strong></td>
   </tr>

  <tr>
    <td style="width:20px;text-align:center;"><img src='https://jira.cellarise.com/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype'/></td> 
    <td style="width:80px;text-align:center;">Feature</td> 
    <td style="width:80px;text-align:left;">MSJSHRB-2</td>
    <td>Package: Develop bamboo reporter for JSHint.</td>
   </tr>


</table>



# License

MIT License (MIT). All rights not explicitly granted in the license are reserved.

Copyright (c) 2014 John Barry

## Dependencies
[ansi-regex@0.2.1](&quot;https://github.com/sindresorhus/ansi-regex&quot;) - &quot;MIT&quot;, [ansi-styles@1.1.0](&quot;https://github.com/sindresorhus/ansi-styles&quot;) - &quot;MIT&quot;, [chalk@0.5.1](&quot;https://github.com/sindresorhus/chalk&quot;) - &quot;MIT&quot;, [clone-stats@0.0.1](&quot;https://github.com/hughsk/clone-stats&quot;) - &quot;MIT&quot;, [core-util-is@1.0.1](&quot;https://github.com/isaacs/core-util-is&quot;) - &quot;MIT&quot;, [dateformat@1.0.8-1.2.3](&quot;https://github.com/felixge/node-dateformat&quot;) - &quot;MIT*&quot;, [duplexer2@0.0.2](&quot;https://github.com/deoxxa/duplexer2&quot;) - &quot;BSD&quot;, [escape-string-regexp@1.0.1](&quot;https://github.com/sindresorhus/escape-string-regexp&quot;) - &quot;MIT&quot;, [gulp-util@3.0.0](&quot;https://github.com/wearefractal/gulp-util&quot;) - [&quot;MIT&quot;], [has-ansi@0.1.0](&quot;https://github.com/sindresorhus/has-ansi&quot;) - &quot;MIT&quot;, [inherits@2.0.1](&quot;https://github.com/isaacs/inherits&quot;) - &quot;ISC&quot;, [isarray@0.0.1](&quot;https://github.com/juliangruber/isarray&quot;) - &quot;MIT&quot;, [jshint-reporter-bamboo@0.0.0](&quot;https://github.com/Cellarise/jshint-reporter-bamboo&quot;) - &quot;MIT License (MIT)&quot;, [lodash._escapehtmlchar@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._escapestringchar@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._htmlescapes@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._isnative@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._objecttypes@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._reinterpolate@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._reunescapedhtml@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._shimkeys@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.defaults@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.escape@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.isobject@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.keys@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.template@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.templatesettings@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.values@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash@2.4.1](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [map-stream@0.1.0](&quot;https://github.com/dominictarr/map-stream&quot;) - , [minimist@0.2.0](&quot;https://github.com/substack/minimist&quot;) - &quot;MIT&quot;, [multipipe@0.1.1](&quot;https://github.com/segmentio/multipipe&quot;) - &quot;MIT*&quot;, [readable-stream@1.0.31](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [readable-stream@1.1.13](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [string_decoder@0.10.31](&quot;https://github.com/rvagg/string_decoder&quot;) - &quot;MIT&quot;, [strip-ansi@0.3.0](&quot;https://github.com/sindresorhus/strip-ansi&quot;) - &quot;MIT&quot;, [supports-color@0.2.0](&quot;https://github.com/sindresorhus/supports-color&quot;) - &quot;MIT&quot;, [through2@0.5.1](&quot;https://github.com/rvagg/through2&quot;) - &quot;MIT&quot;, [vinyl@0.2.3](&quot;https://github.com/wearefractal/vinyl&quot;) - [&quot;MIT&quot;], [xtend@3.0.0](&quot;https://github.com/Raynos/xtend&quot;) - [&quot;MIT&quot;], 
*documented by [npm-licenses](http://github.com/AceMetrix/npm-license.git)*.