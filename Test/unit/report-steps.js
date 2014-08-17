/* jslint node: true */
"use strict";
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
var English = require('yadda').localisation.English;
var JshintReporterBamboo = require('../../lib/index');

/* Feature: Create bamboo reporter for JSHint */
module.exports = (function() {
    return English.library()
    /*Scenario: Lint code with no errors */
        .define("Given I have a $name Javascript file", function(filename, done) {
            this.world.template = path.join(__dirname, '../resources/' + filename);
            this.assert(fs.existsSync(this.world.template + '.js'));
            done();
        })
        .define("When I lint the file", function(done) {
            var results = {};
            var self = this;
            this.world.report = {};

            gulp.src(this.world.template + '.js')
                .pipe(jshint())
                .pipe(new JshintReporterBamboo(results))
                .on('end', function() {
                    self.world.report = results;
                    done();
                });
        })
        .define("Then a report is produced with $result", function(result, done) {
            var expected = JSON.parse(fs.readFileSync(this.world.template + ".json", "UTF-8"));
            var actual = this.world.report;
            //remove timestamps
            delete expected.stats.start;
            delete expected.stats.end;
            delete expected.stats.duration;
            delete actual.stats.start;
            delete actual.stats.end;
            delete actual.stats.duration;
            delete expected.passes;
            delete expected.failures;
            delete actual.passes;
            delete actual.failures;
            this.assert.equal(JSON.stringify(actual,null, 2),JSON.stringify(expected,null, 2));
            done();
        });
})();